export const projectTypeOptions = [
  "General",
  "Product Support",
  "Business",
  "Collaboration",
  "Other",
] as const;

export type ProjectTypeOption = (typeof projectTypeOptions)[number];

export type ContactFormValues = {
  fullName: string;
  emailAddress: string;
  organization: string;
  projectType: ProjectTypeOption;
  message: string;
  companyWebsite: string;
  startedAt: string;
};

export type ContactFormErrors = Partial<
  Record<keyof ContactFormValues, string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  values: ContactFormValues,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  } else if (
    values.fullName.trim().length < 2 ||
    values.fullName.length > 150
  ) {
    errors.fullName = "Please enter a valid full name.";
  }

  if (!values.emailAddress.trim()) {
    errors.emailAddress = "Please enter your email address.";
  } else if (
    !emailPattern.test(values.emailAddress.trim()) ||
    values.emailAddress.length > 254
  ) {
    errors.emailAddress = "Please enter a valid email address.";
  }

  if (!projectTypeOptions.includes(values.projectType)) {
    errors.projectType = "Please choose a valid project type.";
  }

  if (!values.message.trim()) {
    errors.message = "Please tell us a little about your project or goals.";
  } else if (values.message.trim().length < 10) {
    errors.message =
      "Please provide a bit more detail so we can understand the inquiry.";
  } else if (values.message.trim().length > 4000) {
    errors.message = "Please keep the message under 4000 characters.";
  }

  return errors;
}
