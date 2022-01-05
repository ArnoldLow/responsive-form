import ReactDOM from "react-dom";
import Form from "./components/Form";

//I've used Prettier to standardize my code formatting on save,
//this is to help keep my code quality high and easily readable.
//The configuration set is for prettier is default "{}".

//I've also used ESLint to enforce a set code styling on the
//project. This helps create a more consistent code style.
//This is set to recommended.

//I've also used Parcel as the bundler as this requires no
//configuration, this will compile all of the project's code into
//a single complete file.

//I've also used Babel as the transpiler tool that will convert
//the javascript code (compiled at runtime from react) into code
//that is compatible with older browsers via browserslist
//property in package.json. This has been set to the last two
//chrome and firefox versions.

const App = () => {
  return (
    <div>
      <Form />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
