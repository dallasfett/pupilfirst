module Startups
  # This service should be used to check whether a startup is eligible to _level up_ - to move up a level in the main
  # program - it does this by checking whether all milestone targets have been completed.
  class LevelUpEligibilityService
    def initialize(startup, founder)
      @startup = startup
      @founder = founder
      @team_members_pending = false
    end

    ELIGIBILITY_ELIGIBLE = -'eligible'
    ELIGIBILITY_NOT_ELIGIBLE = -'not_eligible'
    ELIGIBILITY_TEAM_MEMBERS_PENDING = -'team_members_pending'
    ELIGIBILITY_DATE_LOCKED = -'date_locked'

    CURRENT_LEVEL_ELIGIBLE_STATUSES = [
      Targets::StatusService::STATUS_SUBMITTED,
      Targets::StatusService::STATUS_PASSED
    ].freeze

    PREVIOUS_LEVEL_ELIGIBLE_STATUSES = [Targets::StatusService::STATUS_PASSED].freeze

    def eligible?
      eligibility == ELIGIBILITY_ELIGIBLE
    end

    def regular_student?
      return false if @founder.user.school_admin.present?

      coach = @founder.user.faculty
      return false if coach.present? && @startup.course.in?(coach.reviewable_courses)

      true
    end

    # rubocop:disable Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity
    def eligibility
      @eligibility ||= begin
        if next_level.blank?
          ELIGIBILITY_NOT_ELIGIBLE
        elsif next_level_unlock_date&.future? && regular_student?
          ELIGIBILITY_DATE_LOCKED
        elsif current_level_milestone_targets.any?
          current_level_targets_attempted = current_level_milestone_targets.all? do |target|
            target_eligible?(target, CURRENT_LEVEL_ELIGIBLE_STATUSES)
          end

          return ELIGIBILITY_TEAM_MEMBERS_PENDING if @team_members_pending

          previous_level_targets_completed = previous_level_milestone_targets.all? do |target|
            target_eligible?(target, PREVIOUS_LEVEL_ELIGIBLE_STATUSES)
          end

          return ELIGIBILITY_TEAM_MEMBERS_PENDING if @team_members_pending

          current_level_targets_attempted && previous_level_targets_completed ? ELIGIBILITY_ELIGIBLE : ELIGIBILITY_NOT_ELIGIBLE
        else
          ELIGIBILITY_NOT_ELIGIBLE
        end
      end
    end
    # rubocop:enable Metrics/CyclomaticComplexity, Metrics/PerceivedComplexity

    def next_level
      @next_level ||= current_level.course.levels.find_by(number: current_level.number + 1)
    end

    def next_level_unlock_date
      @next_level_unlock_date ||= next_level.unlock_on
    end

    private

    def current_level_milestone_targets
      milestone_groups = current_level.target_groups.where(milestone: true)
      Target.where(target_group: milestone_groups).live
    end

    def previous_level_milestone_targets
      if current_level.number > 1
        last_level = current_level.course.levels.find_by(number: current_level.number - 1)

        raise 'Could not find last level for computing level up eligibility' if last_level.blank?

        milestone_groups = last_level.target_groups.where(milestone: true)
        Target.where(target_group: milestone_groups).live
      else
        Target.none
      end
    end

    def target_eligible?(target, eligibility)
      if target.individual_target?
        completed_founders = @startup.founders.all.select do |startup_founder|
          target.status(startup_founder).in?(eligibility)
        end

        if @founder.in?(completed_founders)
          # Mark that some co-founders haven't yet completed target if applicable.
          @team_members_pending ||= completed_founders.count != @startup.founders.count

          # Founder has completed this target.
          true
        else
          false
        end
      else
        target.status(@founder).in?(eligibility)
      end
    end

    def current_level
      @current_level ||= @startup.level
    end
  end
end
