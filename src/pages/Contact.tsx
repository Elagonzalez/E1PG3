import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
} from '@ionic/react';
import React from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="primary" />
          </IonButtons>
          <IonTitle>Contacto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '30px' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ textAlign: 'center', marginBottom: '30px' }}
          >
            <h2 className="antigravity-text">¿Hablamos?</h2>
            <p style={{ color: '#888' }}>Envíanos un mensaje y te responderemos a la velocidad de la luz.</p>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card"
            style={{ padding: '25px', width: '100%', maxWidth: '500px' }}
          >
            <IonItem lines="full" style={{ '--background': 'transparent', marginBottom: '15px' }}>
              <IonLabel position="stacked" color="primary">Nombre</IonLabel>
              <IonInput placeholder="Tu nombre" />
            </IonItem>

            <IonItem lines="full" style={{ '--background': 'transparent', marginBottom: '15px' }}>
              <IonLabel position="stacked" color="primary">Asunto</IonLabel>
              <IonInput placeholder="¿En qué podemos ayudarte?" />
            </IonItem>

            <IonItem lines="full" style={{ '--background': 'transparent', marginBottom: '25px' }}>
              <IonLabel position="stacked" color="primary">Mensaje</IonLabel>
              <IonTextarea rows={4} placeholder="Escribe tu mensaje aquí..." />
            </IonItem>

            <IonButton expand="block" color="primary" style={{ '--border-radius': '10px', height: '50px', fontWeight: 'bold' }}>
              Enviar Mensaje
            </IonButton>
          </motion.div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Contact;
