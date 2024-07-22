import React from 'react'
import CbtSettings from '../components/CbtSettings';
import CbtApp from '../components/CbtApp';

const Cbt = () => {
    const [settings, setSettings] = useState(null);
    const startCBT = (settings) => {
        setSettings(settings);
    };

  return (
    <div>
        <div style={{ flex: 1 }}>
            {!settings ? (
                <CbtSettings startCBT={startCBT} />
            ) : (
                <CbtApp settings={settings} />
            )}
            </div>
    </div>
  )
}

export default Cbt
