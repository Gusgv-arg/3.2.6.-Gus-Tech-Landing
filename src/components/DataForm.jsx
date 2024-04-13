import React from "react";

// Component for sending contact form inside MegaBot interfase
export default function DataForm() {
  const [mail, setMail] = React.useState("");
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [apiResponse, setApiResponse] = React.useState(null);

  const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (mail === "") return false;
    return validateEmail(mail) ? false : true;
  }, [mail]);

  const submitHandler = async function (event) {
    event.preventDefault();
    const lead = { name: name, email: mail, message: message }
    try {
      const response = await fetch(
        "http://localhost:4000/chatGpt/leads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(lead)
        }
      );
      const data = await response.json();
      setApiResponse(data.message)
      console.log(data)
    } catch (error) {
      setApiResponse(error.message)
    }
  }

  return (
    <>
      <div className="dataForm">
        <div className="">
          <p className="">¿Querés enviarnos un mensaje? !Sino seguí conversando!</p>
        </div>

        <div className="">
          <form className="" onSubmit={submitHandler}>
            <input
              required
              value={name}
              type="string"
              label="Nombre"
              onValueChange={setName}
              className="inputForm"
            />
            <input
              required
              value={mail}
              type="email"
              label="Mail"
              onValueChange={setMail}
              className="inputForm"
            />
            <textarea
              placeholder="Escribinos tu mensaje..."
              value={message}
              onValueChange={setMessage}
              className="inputForm "
            />
            <div>
              <button type="submit" className="inputFormButton">Enviar</button>
              {apiResponse ? apiResponse : ""}
              <br />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

