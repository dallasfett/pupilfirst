// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var React = require("react");
var ReasonReact = require("reason-react/src/ReasonReact.js");
var File$ReactTemplate = require("../types/File.bs.js");
var Link$ReactTemplate = require("../types/Link.bs.js");
var DateTime$ReactTemplate = require("../types/DateTime.bs.js");
var ReviewForm$ReactTemplate = require("./ReviewForm.bs.js");
var FeedbackForm$ReactTemplate = require("./FeedbackForm.bs.js");
var TimelineEvent$ReactTemplate = require("../types/TimelineEvent.bs.js");
var UndoReviewButton$ReactTemplate = require("./UndoReviewButton.bs.js");
var ReviewStatusBadge$ReactTemplate = require("./ReviewStatusBadge.bs.js");

((require("./TimelineEventCard.scss")));

function str(prim) {
  return prim;
}

var component = ReasonReact.statelessComponent("TimelineEventCard");

function make(timelineEvent, replaceTE_CB, authenticityToken, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function () {
              var match = TimelineEvent$ReactTemplate.status(timelineEvent);
              var links = TimelineEvent$ReactTemplate.links(timelineEvent);
              var files = TimelineEvent$ReactTemplate.files(timelineEvent);
              var match$1 = TimelineEvent$ReactTemplate.status(timelineEvent);
              return React.createElement("div", {
                          className: "timeline-event-card__container card"
                        }, React.createElement("div", {
                              className: "card-header d-flex"
                            }, React.createElement("div", undefined, TimelineEvent$ReactTemplate.title(timelineEvent), React.createElement("div", {
                                      className: "timeline-event-card__header-subtext"
                                    }, TimelineEvent$ReactTemplate.founderName(timelineEvent) + (" (" + (TimelineEvent$ReactTemplate.startupName(timelineEvent) + ")")))), React.createElement("div", {
                                  className: "ml-auto"
                                }, React.createElement("div", {
                                      className: "timeline-event-card__header-date-field"
                                    }, React.createElement("i", {
                                          className: "fa fa-calendar mr-1"
                                        }), DateTime$ReactTemplate.format(/* OnlyDate */0, TimelineEvent$ReactTemplate.eventOn(timelineEvent))))), React.createElement("div", {
                              className: "card-body row"
                            }, React.createElement("div", {
                                  className: "col-md-7"
                                }, React.createElement("h5", {
                                      className: "timeline-event-card__field-header mt-0"
                                    }, "Description:"), TimelineEvent$ReactTemplate.description(timelineEvent), ReasonReact.element(/* None */0, /* None */0, FeedbackForm$ReactTemplate.make(/* array */[]))), React.createElement("div", {
                                  className: "col-md-5"
                                }, match ? ReasonReact.element(/* None */0, /* None */0, UndoReviewButton$ReactTemplate.make(timelineEvent, replaceTE_CB, /* array */[])) : ReasonReact.element(/* Some */[String(TimelineEvent$ReactTemplate.id(timelineEvent))], /* None */0, ReviewForm$ReactTemplate.make(timelineEvent, replaceTE_CB, authenticityToken, /* array */[])))), React.createElement("div", {
                              className: "card-footer d-flex"
                            }, List.length(links) === 0 ? null : React.createElement("div", undefined, $$Array.of_list(List.map((function (link) {
                                              var match = Link$ReactTemplate.private_(link);
                                              return React.createElement("a", {
                                                          key: Link$ReactTemplate.url(link),
                                                          className: "btn btn-secondary mr-1",
                                                          href: Link$ReactTemplate.url(link),
                                                          target: "_blank"
                                                        }, match ? React.createElement("i", {
                                                                className: "fa fa-lock mr-1"
                                                              }) : React.createElement("i", {
                                                                className: "fa fa-globe mr-1"
                                                              }), Link$ReactTemplate.title(link));
                                            }), links))), List.length(files) === 0 ? null : React.createElement("div", undefined, $$Array.of_list(List.map((function (file) {
                                              var id = String(File$ReactTemplate.id(file));
                                              var url = "/timeline_event_files/" + (id + "/download");
                                              return React.createElement("a", {
                                                          key: id,
                                                          className: "btn btn-secondary mr-1",
                                                          href: url,
                                                          target: "_blank"
                                                        }, React.createElement("i", {
                                                              className: "fa fa-file mr-1"
                                                            }), File$ReactTemplate.title(file));
                                            }), files))), React.createElement("div", {
                                  className: "ml-auto"
                                }, match$1 ? ReasonReact.element(/* None */0, /* None */0, ReviewStatusBadge$ReactTemplate.make(match$1[0], /* array */[])) : React.createElement("div", {
                                        className: "timeline-event-card__footer-subtext"
                                      }, "Submitted at: " + DateTime$ReactTemplate.format(/* DateAndTime */1, TimelineEvent$ReactTemplate.submittedAt(timelineEvent))))));
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

exports.str = str;
exports.component = component;
exports.make = make;
/*  Not a pure module */