import React from "react";



export default function ContactForm() {
  const [mail, setMail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [apiResponse, setApiResponse] = React.useState(null);


  const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (mail === "") return false;
    return validateEmail(mail) ? false : true;
  }, [mail]);

  const submitHandler = async function (event) {
    event.preventDefault();
    const lead = { name: name, phone: phone, email: mail, message: message }
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
      setApiResponse(`!Error¡ ${error.message}`)
    }
  }

  return (
    <>
      <div className="contactForm">
        <form className="" onSubmit={submitHandler}>
          <input
            isClearable
            size="lg"
            isRequired
            value={name}
            type="string"
            label="Nombre"
            variant="bordered"
            color="success"
            onValueChange={setName}
            className="max-w-xs contactInputForm"
          />
          <input
            isClearable
            size="lg"
            value={phone}
            type="number"
            label="Teléfono"
            variant="bordered"
            isInvalid={isInvalid}
            color="success"
            onValueChange={setPhone}
            className="max-w-xs contactInputForm"
          />
          <input
            isClearable
            size="lg"
            isRequired
            value={mail}
            type="email"
            label="Mail"
            variant="bordered"
            isInvalid={isInvalid}
            color="success"
            errorMessage={isInvalid && "Por favor ingrese un mail válido"}
            onValueChange={setMail}
            className="max-w-xs contactInputForm"
          />
          <textarea
            variant="bordered"
            size="lg"
            placeholder="Escribinos tu mensaje..."
            color="success"
            value={message}
            onValueChange={setMessage}
            className="max-w-xs contactInputForm"
          />
          <button type="submit" className="contactFormButton" size="md" color="default" variant="solid">Enviar</button>
          {apiResponse ? apiResponse : ""}
        </form>
      </div>
     
    </>
  );
}

