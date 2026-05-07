import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAvatar,
} from '@ionic/react';
import React from 'react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  return (
    <IonPage>
      {/* Cabecera estándar de la página */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="primary" />
          </IonButtons>
          <IonTitle>Información Personal</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px' }}>
          {/* Mi avatar con una animación de rebote tipo "spring" */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <IonAvatar style={{ width: '120px', height: '120px', border: '3px solid var(--ion-color-primary)', padding: '4px' }}>
              <img alt="Silueta de usuario" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </IonAvatar>
          </motion.div>

          {/* Nombre y cargo con una entrada lateral */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ textAlign: 'center', marginTop: '20px' }}
          >
            <h2 className="antigravity-text">Eliezer Gonzalez</h2>
            <p style={{ color: '#888' }}>Desarrollador Full Stack</p>
          </motion.div>

          {/* Tarjeta de información con mis datos de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card"
            style={{ padding: '20px', width: '100%', maxWidth: '400px', marginTop: '30px' }}
          >
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: 'var(--ion-color-primary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Email</label>
              <p style={{ margin: '5px 0' }}>eliezer15gonzalez@gmail.com</p>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: 'var(--ion-color-primary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Ubicación</label>
              <p style={{ margin: '5px 0' }}>Los Teques, Miranda</p>
            </div>
            <div>
              <label style={{ color: 'var(--ion-color-primary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Biografía</label>
              <p style={{ margin: '5px 0', lineHeight: '1.4' }}>Apasionado por crear interfaces que desafían la gravedad y la lógica convencional.</p>
            </div>
          </motion.div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
