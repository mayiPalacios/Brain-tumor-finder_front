import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          home: {
            title: "Your health is in good hands",
            generaldescription:
              "Don't let brain tumors take you by surprise: AI helps you detect brain tumors early.",
            generalDescriptionP:
              "Imaging detection of brain tumors is a constantly evolving field of research, and the application of AI Artificial Intelligence techniques in the health area has proven to be a promising tool for diagnostic accuracy and speed.",
            description3:
              "Early detection of brain tumors is crucial for the success of treatment and patient survival. The use of AI algorithms, such as convolutional neural networks, can help improve the accuracy and efficiency of brain tumor detection in MRI scans, as well as reduce detection time and cost.",
            inviteDescription:
              "State-of-the-art technology is in your hands: join the early detection of tumors with the AI ​​BrainTumorFinder.",
            btn: "I want to try it",
          },
          header: {
            home: "Home",
            contact: "Contact us",
            signUp: "Sign up",
            login: "login",
            logout: "Logout",
            register: "Register",
            diagnostic: "Diagnostic",
          },
          doctors: {
            approved: "Approved",
            rejected: "Rejected"
          },
          login: {
            email: "Email",
            password: "Password",
            login: "Login",
            btn: "Login",
          },
          signup: {
            register: "Sign Up",
            firtsN: "firts name",
            lastN: "firts lastname",
            cards: "Doctors cards",
            Country: "Country",
            passConfirm: "password confirmation",
            success: "User successfully register in our system"
          },
          contact: {
            title: "Contact us for more information",
            name: "User name",
            subject: "Subject",
            message: "Message",
            btn: "Send",
          },
          results: {
            results: "results",
            positiveR: "positive probability",
            negativeR: "negative probability",
            name: "Name of patient",
            validate: "Validate Results",
            btn: "Save",
            comments: "comments",
          },
        },
      },
      es: {
        translation: {
          home: {
            title: "Tu salud está en buenas manos",
            generaldescription:
              "No dejes que los tumores cerebrales te tomen por sorpresa: La IA te ayuda a detectar tumores cerebrales de temprana.",
            generalDescriptionP:
              "La deteccion de tumores cerebrales mediante imagenes es un campo  de investigacion en constante evolucion, y la aplicacion detecnicas de Inteligencia Artificial IA en el area de la salud ha demostrado ser una herramienta prometedora para la precision y velocidad del diagnosticos",
            description3:
              "La detección temprana de tumores cerebrales es crucial para el éxito del tratamiento y la supervivencia del paciente. La utilización de algoritmos de IA, como las redes neuronales convolucionales, puede ayudar a mejorar la precisión y eficacia de la detección de tumores cerebrales en las imágenes de resonancia magnética, además de reducir el tiempo y el costo de detección.",
            inviteDescription:
              "La tecnología de vanguardia está en tus manos: únete a la detección temprana de tumores con la IA BrainTumorFinder.",
            btn: "Quiero Probarlo",
          },
          header: {
            home: "Menu",
            contact: "Contactanos",
            signUp: "registrarse",
            login: "iniciar sesion",
            logout: "Cerrar sesión",
            register: "Registros",
            diagnostic: "Diagnostico",
          },
          doctors: {
            approved: "Aprobado",
            rejected: "Rechazado"
          },
          login: {
            email: "Correo",
            password: "contraseña",
            login: "iniciar sesion",
            btn: "iniciar",
          },
          signup: {
            register: "Registro",
            firtsN: "primer nombre",
            lastN: "apellidos",
            cards: "credencial de doctor",
            Country: "pais",
            passConfirm: "confirmacion de contraseña",
            success: "El usuario se registro con exito"
          },
          contact: {
            title: "Contactanos para más información",
            name: "Nombre de Usuario",
            subject: "asunto",
            message: "mensaje",
            btn: "enviar",
          },
          results: {
            results: "resultados",
            positiveR: "probabilidad positiva",
            negativeR: "probabilidad negativa",
            name: "Nombre del paciente",
            validate: "Validar Resultados",
            btn: "Guardar",
            comments: "comentarios",
          },
        },
      },
    },
  });

export default i18n;
