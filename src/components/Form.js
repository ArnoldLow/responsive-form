import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import logo from "../assets/EventisLogo.png";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

//Here I've created a react function that will handle the form. I've created two hooks utilising useState,
//one of type object and one of type boolean. The object state hook allows me to set the entered form data into
//the state and to retrieve the form data after a successful submit action (pending validation of form data),
//ready to be used for a payload delivery to an API. The boolean state hook allows me to instruct the component to
//determine which div container to render to the user depending on if the form has been submitted using a ternary,
//either the form box or the thank you/payload box with a confetti animation. React-confetti was used for the
//confetti animation as there was no need to create an animation from scratch as this provided a clean lightweight solution.

//Formik here manages it own state, all whilst im passing through the state hook after which formik will use
//yup's validation to check against the validation schema I've implemented. Validation is performed in realtime and at submit time.
//Real Time validation occurs when the user clicks off of a input field, triggered by formik's "touched" property,
//producing a validation error message beneath the input field, disappearing only when the user's input
//matches the validation parameters, via react's virtual dom process called reconciliation. The submit time
//validation occurs when the users clicks on the submit button, formik will then check if the form data is validated
//internally using the validation object provided. Formik's initial state values are all empty strings as that data
//will be passed through via the react state hook on "setFormData".

//There wasn't a lot to do on the CSS side of things, therefore I thought using external libraries was bit excessive
//and opted to use vanilla CSS but in the future I would use tailwind if there was more css to implement.

const UserForm = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validation = Yup.object({
    name: Yup.string()
      .min(1, "Your name must not be empty.")
      .required("Enter your full name."),
    email: Yup.string()
      .email("This email is invalid.")
      .required("Your email is required."),
    notes: Yup.string()
      .min(20, "Notes must be at least 20 characters.")
      .required("Notes cannot be left empty."),
  });

  const { width, height } = useWindowSize();

  return (
    <div className="main">
      {isSubmitted ? (
        <div className="payload-container">
          <Confetti width={width} height={height} />
          <h1>Thank you!</h1>
          <h3>This is the payload that would be sent to the API: </h3>
          <p className="payload-title">Full name: </p>
          <p className="payload-body">{formData.name}</p>
          <p className="payload-title">Email: </p>
          <p className="payload-body">{formData.email}</p>
          <p className="payload-title">Notes: </p>
          <p className="payload-body">{formData.notes}</p>
        </div>
      ) : (
        <Formik
          initialValues={{
            name: "",
            email: "",
            notes: "",
          }}
          validationSchema={validation}
          onSubmit={(values) => {
            setFormData(values);
            setIsSubmitted(true);
          }}
        >
          {({ errors, touched, values }) => (
            <Form className="form-container">
              <img className="logo" src={logo} alt="logo" />
              <h3>Full Name:</h3>
              <Field name="name" type="text" />
              {errors.name && touched.name ? (
                <div className="error">{errors.name}</div>
              ) : null}
              <h3>Email:</h3>
              <Field name="email" type="email" />
              {errors.email && touched.email ? (
                <div className="error">{errors.email}</div>
              ) : null}
              <h3>Notes:</h3>
              <Field name="notes" as="textarea" />
              <p>Current character count: {values.notes.length}</p>
              {errors.notes && touched.notes ? (
                <div className="error">{errors.notes}</div>
              ) : null}
              <button name="submit" type="submit">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UserForm;
