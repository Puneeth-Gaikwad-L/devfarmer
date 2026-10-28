// Lets other sections (e.g. a service card) pre-select a service in the contact form.
// The form is lazy-loaded, so the choice is also kept until it mounts and reads it.
export const SELECT_SERVICE_EVENT = "devfarmer:select-service";

let pendingService = null;

export const selectService = (title) => {
  pendingService = title;
  window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: title }));
};

export const takePendingService = () => {
  const title = pendingService;
  pendingService = null;
  return title;
};
