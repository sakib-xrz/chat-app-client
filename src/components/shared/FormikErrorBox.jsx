export default function FormikErrorBox({ formik, field }) {
  const showError = formik.errors[field] && formik.touched[field];
  const defaultClassNames =
    "rounded-md bg-red-50 px-2 py-1 mt-2 text-xs text-red-500 border border-red-text-red-500";
  const errorMessage = formik.errors[field];
  return showError ? (
    <div className={defaultClassNames}>{errorMessage}</div>
  ) : null;
}
