[@bs.config {jsx: 3}];

open CoursesCurriculum__Types;

let str = React.string;

let showLink = (value, callback) => {
  <input
    id="link"
    type_="text"
    value
    onChange={e =>
      callback(ChecklistResponseItem.Link(ReactEvent.Form.target(e)##value))
    }
    placeholder="Type full URL starting with https://..."
    className="mt-2 cursor-pointer truncate h-10 border border-grey-400  px-4 items-center font-semibold rounded text-sm mr-2 block w-full"
  />;
};

let showShortText = (value, callback) => {
  <input
    id="short_text"
    type_="text"
    value
    onChange={e =>
      callback(
        ChecklistResponseItem.ShortText(ReactEvent.Form.target(e)##value),
      )
    }
    placeholder="Add a short text"
    className="mt-2 cursor-pointer truncate h-10 border border-grey-400  px-4 items-center font-semibold rounded text-sm mr-2 block w-full"
  />;
};

let showLongText = (value, callback) => {
  <textarea
    id="long_text"
    maxLength=1000
    className="h-40 w-full rounded-lg mt-4 p-4 border border-gray-400 focus:outline-none focus:border-gray-500 rounded-lg"
    placeholder="Describe your work, or leave notes to the reviewer here. If you are submitting a URL, or need to attach a file, use the controls below to add them."
    value
    onChange={e =>
      callback(
        ChecklistResponseItem.LongText(ReactEvent.Form.target(e)##value),
      )
    }
  />;
};

let showMultiChoice = (choices, choice, callback) => {
  <div>
    {choices
     |> Array.mapi((index, c) => {<div> {c |> str} </div>})
     |> React.array}
  </div>;
};

let showFiles = (files, callback, preview) => {
  let attachFileCB = (id, filename) =>
    callback(
      ChecklistResponseItem.Files(
        files
        |> Array.append([|ChecklistResponseItem.makeFile(id, filename)|]),
      ),
    );
  <div>
    <div className="flex flex-wrap">
      {files
       |> Array.map(file => {
            <div
              key={"file-" ++ (file |> ChecklistResponseItem.fileId)}
              target="_blank"
              className="mt-2 mr-3 flex items-center border overflow-hidden shadow rounded hover:shadow-md border-primary-400 bg-primary-200 text-primary-500 hover:border-primary-600 hover:text-primary-700">
              <span
                className="flex h-full w-8 justify-center items-center p-2 bg-primary-200">
                <i className="far fa-file" />
              </span>
              <span
                className="course-show-attachments__attachment-title rounded text-xs font-semibold inline-block whitespace-normal truncate w-32 md:w-42 h-full px-3 py-1 leading-loose bg-primary-100">
                {file |> ChecklistResponseItem.filename |> str}
              </span>
            </div>
          })
       |> React.array}
    </div>
    <CoursesCurriculum__FileForm attachingCB={() => ()} attachFileCB preview />
  </div>;
};

[@react.component]
let make = (~index, ~response, ~updateResponseCB, ~preview) => {
  let key = index |> string_of_int;
  let question = response |> ChecklistResponseItem.question;
  <div>
    <label htmlFor="submission-description" className="font-semibold pl-1">
      {(question |> TargetChecklistItem.title)
       ++ (question |> TargetChecklistItem.optional ? " (optional)" : "")
       |> str}
    </label>
    {switch (
       question |> TargetChecklistItem.kind,
       response |> ChecklistResponseItem.answer,
     ) {
     | (Files, Files(files)) => showFiles(files, updateResponseCB, preview)
     | (Link, Link(link)) => showLink(link, updateResponseCB)
     | (ShortText, ShortText(shortText)) =>
       showShortText(shortText, updateResponseCB)
     | (LongText, LongText(longText)) =>
       showLongText(longText, updateResponseCB)
     | (MultiChoice(choices), MultiChoice(choice)) =>
       showMultiChoice(choices, choice, updateResponseCB)
     | (Statement, Statement) => React.null
     | (_, _) => React.null
     }}
  </div>;
};
