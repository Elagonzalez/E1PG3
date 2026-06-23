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
  IonIcon,
} from '@ionic/react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { moonOutline, sunnyOutline, checkmarkCircle, alertCircle } from 'ionicons/icons';
import { useTheme } from '../context/ThemeContext';
import { useHaptic } from '../hooks/useHaptic';
import useScrollAnimation from '../hooks/useScrollAnimation';

const Contact: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { triggerHaptic } = useHaptic();
  const [titleRef, titleVisible] = useScrollAnimation();
  const [formRef, formVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({ name: '', subject: '', message: '' });
  const [errors, setErrors] = useState({ name: '', subject: '', message: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const newErrors = { name: '', subject: '', message: '', email: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
      isValid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es obligatorio';
      isValid = false;
    }
    if (formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic();

    if (validateForm()) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="primary" />
          </IonButtons>
          <IonTitle>Contacto</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => { toggleTheme(); triggerHaptic(); }} color="primary">
              <IonIcon icon={theme === 'dark' ? moonOutline : sunnyOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '30px' }}>
          <motion.div
            ref={titleRef as any}
            initial={{ opacity: 0 }}
            animate={titleVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ textAlign: 'center', marginBottom: '30px' }}
          >
            <h2 className="antigravity-text">¿Hablamos?</h2>
            <p style={{ color: '#888' }}>Envíanos un mensaje y te responderemos a la velocidad de la luz.</p>
          </motion.div>

          <motion.div
            ref={formRef as any}
            initial={{ y: 50, opacity: 0 }}
            animate={formVisible ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.01, boxShadow: '0 8px 32px rgba(0, 210, 255, 0.3)' }}
            className="glass-card"
            style={{ padding: '25px', width: '100%', maxWidth: '500px' }}
          >
            <form onSubmit={handleSubmit}>
              <IonItem lines="full" style={{ '--background': 'transparent', marginBottom: '15px' }}>
                <IonLabel position="stacked" color="primary">
                  Nombre
                  {errors.name && <IonIcon icon={alertCircle} color="danger" style={{ marginLeft: '5px', fontSize: '14px' }} />}
                </IonLabel>
                <IonInput
                  placeholder="Tu nombre"
                  value={formData.name}
                  onIonInput={(e) => handleChange('name', e.detail.value as string)}
                  color={errors.name ? 'danger' : 'primary'}
                />
              </IonItem>
              {errors.name && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--ion-color-danger)', fontSize: '12px', marginTop: '-10px', marginBottom: '10px' }}>{errors.name}</motion.p>}

              <IonItem lines="full" style={{ '--background': 'transparent', marginBottom: '15px' }}>
                <IonLabel position="stacked" color="primary">
                  Asunto
                  {errors.subject && <IonIcon icon={alertCircle} color="danger" style={{ marginLeft: '5px', fontSize: '14px' }} />}
                </IonLabel>
                <IonInput
                  placeholder="¿En qué podemos ayudarte?"
                  value={formData.subject}
                  onIonInput={(e) => handleChange('subject', e.detail.value as string)}
                  color={errors.subject ? 'danger' : 'primary'}
                />
              </IonItem>
              {errors.subject && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--ion-color-danger)', fontSize: '12px', marginTop: '-10px', marginBottom: '10px' }}>{errors.subject}</motion.p>}

              <IonItem lines="full" style={{ '--background': 'transparent', marginBottom: '25px' }}>
                <IonLabel position="stacked" color="primary">
                  Mensaje
                  {errors.message && <IonIcon icon={alertCircle} color="danger" style={{ marginLeft: '5px', fontSize: '14px' }} />}
                </IonLabel>
                <IonTextarea
                  rows={4}
                  placeholder="Escribe tu mensaje aquí..."
                  value={formData.message}
                  onIonInput={(e) => handleChange('message', e.detail.value as string)}
                  color={errors.message ? 'danger' : 'primary'}
                />
              </IonItem>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  color: formData.message.length >= 10 ? 'var(--ion-color-success)' : 'var(--ion-color-warning)',
                  fontSize: '12px',
                  marginTop: '-20px',
                  marginBottom: '15px',
                  textAlign: 'right'
                }}
              >
                {formData.message.length}/10 caracteres mínimos
              </motion.p>
              {errors.message && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--ion-color-danger)', fontSize: '12px', marginTop: '-10px', marginBottom: '10px' }}>{errors.message}</motion.p>}

              <IonButton
                expand="block"
                color="primary"
                style={{ '--border-radius': '10px', height: '50px', fontWeight: 'bold' }}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : submitSuccess ? (
                  <>
                    <IonIcon icon={checkmarkCircle} slot="start" />
                    ¡Enviado!
                  </>
                ) : 'Enviar Mensaje'}
              </IonButton>
            </form>
          </motion.div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Contact;
