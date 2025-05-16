// import { Component } from "react";
// import Keyboard from "react-simple-keyboard";

// import "react-simple-keyboard/build/css/index.css";

// class ClassKeyboard extends Component {
//   state = {
//     layoutName: "default",
//   };

//   onKeyPress = (button) => {
//     console.log("Button pressed", button);

//     if (button === "{shift}" || button === "{lock}") this.handleShift();
//   };

//   handleShift = () => {
//     const { layoutName } = this.state;

//     this.setState({
//       layoutName: layoutName === "default" ? "shift" : "default",
//     });
//   };

//   onChangeInput = (event) => {
//     const input = event.target.value;
//     this.setState({ input });
//     this.keyboard.setInput(input);
//   };

//   render() {
//     const { input, layoutName } = this.state;

//     return (
//       <div>
//         <input
//           value={input}
//           placeholder={"Tap on the virtual keyboard to start"}
//           onChange={this.props.onChangeInput}
//         />
//         <Keyboard
//           keyboardRef={(r) => (this.keyboard = r)}
//           layoutName={layoutName}
//           onChange={this.props.onChange}
//           onKeyPress={(button) => {
//             this.onKeyPress(button);
//             this.onKeyPress(button);
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default ClassKeyboard;
