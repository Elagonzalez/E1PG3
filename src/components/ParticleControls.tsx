import React, { useState } from 'react';
import { IonButton, IonIcon, IonRange, IonItem, IonLabel, IonContent, IonCard, IonCardContent } from '@ionic/react';
import { settingsOutline, refreshOutline, magnetOutline, arrowDownOutline } from 'ionicons/icons';
import './ParticleControls.css';

interface ParticleControlsProps {
  interactionMode: 'repulsion' | 'attraction';
  onInteractionModeChange: (mode: 'repulsion' | 'attraction') => void;
  particleCount: number;
  onParticleCountChange: (count: number) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  interactionRadius: number;
  onInteractionRadiusChange: (radius: number) => void;
  gravityEnabled: boolean;
  onGravityToggle: () => void;
  onReset: () => void;
  particlesActivated: number;
  mouseDistance: number;
}

const ParticleControls: React.FC<ParticleControlsProps> = ({
  interactionMode,
  onInteractionModeChange,
  particleCount,
  onParticleCountChange,
  speed,
  onSpeedChange,
  interactionRadius,
  onInteractionRadiusChange,
  gravityEnabled,
  onGravityToggle,
  onReset,
  particlesActivated,
  mouseDistance,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`particle-controls ${isExpanded ? 'expanded' : ''}`}>
      <IonButton
        className="toggle-button"
        onClick={() => setIsExpanded(!isExpanded)}
        color="primary"
      >
        <IonIcon icon={settingsOutline} slot="icon-only" />
      </IonButton>

      {isExpanded && (
        <IonCard className="controls-card">
          <IonCardContent>
            <div className="controls-content">
              <h3>Controles de Partículas</h3>

              <IonItem lines="none">
                <IonLabel>Modo: {interactionMode === 'repulsion' ? 'Repulsión' : 'Atracción'}</IonLabel>
                <IonButton
                  size="small"
                  onClick={() => onInteractionModeChange(interactionMode === 'repulsion' ? 'attraction' : 'repulsion')}
                >
                  <IonIcon icon={magnetOutline} slot="icon-only" />
                </IonButton>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>Gravedad</IonLabel>
                <IonButton
                  size="small"
                  color={gravityEnabled ? 'success' : 'medium'}
                  onClick={onGravityToggle}
                >
                  <IonIcon icon={arrowDownOutline} slot="icon-only" />
                </IonButton>
              </IonItem>

              <div className="range-control">
                <IonLabel>Cantidad: {particleCount}</IonLabel>
                <IonRange
                  min={20}
                  max={150}
                  step={10}
                  value={particleCount}
                  onIonChange={(e) => onParticleCountChange(e.detail.value as number)}
                />
              </div>

              <div className="range-control">
                <IonLabel>Velocidad: {speed.toFixed(1)}x</IonLabel>
                <IonRange
                  min={0.1}
                  max={2}
                  step={0.1}
                  value={speed}
                  onIonChange={(e) => onSpeedChange(e.detail.value as number)}
                />
              </div>

              <div className="range-control">
                <IonLabel>Radio: {interactionRadius}px</IonLabel>
                <IonRange
                  min={50}
                  max={300}
                  step={10}
                  value={interactionRadius}
                  onIonChange={(e) => onInteractionRadiusChange(e.detail.value as number)}
                />
              </div>

              <div className="stats">
                <p>Partículas activadas: <strong>{particlesActivated}</strong></p>
                <p>Distancia mouse: <strong>{Math.floor(mouseDistance)}px</strong></p>
              </div>

              <IonButton
                expand="block"
                fill="outline"
                onClick={onReset}
              >
                <IonIcon icon={refreshOutline} slot="start" />
                Resetear
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      )}
    </div>
  );
};

export default ParticleControls;
