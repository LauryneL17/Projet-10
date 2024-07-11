import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 500); })

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);  // Ajouter un état pour le succès
  const [error, setError] = useState(null); // Ajouter un état pour les erreurs

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      setError(null);  // Réinitialiser l'erreur avant l'envoi
      try {
        await mockContactApi();
        setSuccess(true); // Définir le succès après la réponse de l'API
        setSending(false);
        onSuccess(); // Appeler la fonction onSuccess
      } catch (err) {
        setError("Une erreur est survenue, veuillez réessayer."); // Définir un message d'erreur
        setSending(false);
        onError(err); // Appeler la fonction onError
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
          {success && <div className="success-message">Votre message a été envoyé avec succès !</div>} {/* Afficher le message de succès */}
          {error && <div className="error-message">{error}</div>} {/* Afficher le message d'erreur */}
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
