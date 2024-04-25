import React from "react";
import AppMode from "./../AppMode";

class contactMe extends React.Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: "",
        email: "",
        subject: "",
        message: ""
      }
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // You can perform any action with the form data here, such as sending it to a server
    console.log("Form submitted:", this.state.formData);
    // Clear the form after submission
    this.setState({
      formData: {
        name: "",
        email: "",
        subject: "",
        message: ""
      }
    });
  }

  render() {
    const { formData } = this.state;
    return (
      <div>
        <div className='spaceWeatherHeader'> 
        <h1>This Page is under construction!!</h1>
        </div>
      <div class="videos">
        <form onSubmit={this.handleSubmit}>
          <div >
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit">Send Message</button>
        </form>
      </div>
      </div>
    )
  }
}

export default contactMe;
