import { useState, useEffect } from 'react'
import './App.css'

// Import the mech data
import mechData from './Example Mech/Blackbeard-1.1.json'

// Import Lancer Data
import blackbeardFrame from './Lancer Data/Frame/Blackbeard.json'
import syntheticMuscleNetting from './Lancer Data/System/Synthetic Muscle Netting.json'
import chainAxe from './Lancer Data/Weapon/Chain Axe.json'
import briareosBonus from './Lancer Data/Core Bonus/BRIAREOS FRAME REINFORCEMENT.json'

interface MechData {
  Name: string
  Pilot: string
  Frame: string
  Systems: string[]
  Weapons: string[]
  "Core Bonuses": string[]
}

interface FrameData {
  Name: string
  [key: string]: any
}

interface SystemData {
  Name: string
  [key: string]: any
}

interface WeaponData {
  Name: string
  [key: string]: any
}

interface CoreBonusData {
  Name: string
  [key: string]: any
}

function App() {
  const [mech, setMech] = useState<MechData | null>(null)
  const [frame, setFrame] = useState<FrameData | null>(null)
  const [systems, setSystems] = useState<SystemData[]>([])
  const [weapons, setWeapons] = useState<WeaponData[]>([])
  const [coreBonuses, setCoreBonuses] = useState<CoreBonusData[]>([])

  useEffect(() => {
    // Load mech data
    setMech(mechData as MechData)

    // Load frame data
    setFrame(blackbeardFrame as FrameData)

    // Load systems
    const systemsData = [syntheticMuscleNetting]
    setSystems(systemsData as SystemData[])

    // Load weapons
    const weaponsData = [chainAxe]
    setWeapons(weaponsData as WeaponData[])

    // Load core bonuses
    const coreBonusesData = [briareosBonus]
    setCoreBonuses(coreBonusesData as CoreBonusData[])
  }, [])

  if (!mech) return <div>Loading...</div>

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      {/* Mech Name and Pilot Section */}
      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#2c3e50', color: '#fff', borderRadius: '8px', textAlign: 'left' }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#fff', textAlign: 'center' }}>{mech.Name}</h1>
        <p style={{ margin: '0', fontSize: '18px', color: '#fff' }}><strong>Pilot:</strong> {mech.Pilot}</p>
      </section>

      {/* Frame Section */}
      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff', border: '2px solid #333', borderRadius: '8px', textAlign: 'left' }}>
        <h2 style={{ marginTop: '0', color: '#333', textAlign: 'center' }}>Frame: {mech.Frame}</h2>
        {frame && (
          <div style={{ marginTop: '15px' }}>
            <p style={{ color: '#333' }}><strong>Manufacturer:</strong> {frame.Manufacturer}</p>
            <p style={{ color: '#333' }}><strong>Role:</strong> {frame.Role}</p>
            <p style={{ color: '#333' }}><strong>Source:</strong> {frame.Source}</p>
            <p style={{ color: '#333' }}><strong>Description:</strong> {frame.Description}</p>
            
            <h3 style={{ color: '#333', marginTop: '20px', textAlign: 'center' }}>Core Stats</h3>
            <p style={{ color: '#333' }}><strong>Size:</strong> {frame['Core Stats']?.Size}</p>
            <p style={{ color: '#333' }}><strong>Armor:</strong> {frame['Core Stats']?.Armor}</p>
            <p style={{ color: '#333' }}><strong>Save Target:</strong> {frame['Core Stats']?.['Save Target']}</p>
            <p style={{ color: '#333' }}><strong>Sensors:</strong> {frame['Core Stats']?.Sensors}</p>
            <p style={{ color: '#333' }}><strong>HP:</strong> {frame['Core Stats']?.Hull?.HP} | <strong>Repair Cap:</strong> {frame['Core Stats']?.Hull?.['Repair Cap']}</p>
            <p style={{ color: '#333' }}><strong>Evasion:</strong> {frame['Core Stats']?.Agility?.Evasion} | <strong>Speed:</strong> {frame['Core Stats']?.Agility?.Speed}</p>
            <p style={{ color: '#333' }}><strong>E-Defense:</strong> {frame['Core Stats']?.Systems?.['E-Defense']} | <strong>Tech Attack:</strong> {frame['Core Stats']?.Systems?.['Tech Attack']} | <strong>SP:</strong> {frame['Core Stats']?.Systems?.SP}</p>
            <p style={{ color: '#333' }}><strong>Heat Cap:</strong> {frame['Core Stats']?.Engineering?.['Heat Cap']}</p>
            
            <h3 style={{ color: '#333', marginTop: '20px', textAlign: 'center' }}>Traits</h3>
            {frame.Traits?.map((trait: any, idx: number) => (
              <div key={idx} style={{ marginBottom: '10px' }}>
                <p style={{ color: '#333' }}><strong>{trait.Name}:</strong> {trait.Effect}</p>
              </div>
            ))}
            
            <h3 style={{ color: '#333', marginTop: '20px', textAlign: 'center' }}>Mounts</h3>
            <p style={{ color: '#333' }}>{frame.Mounts?.join(', ')}</p>
            
            <h3 style={{ color: '#333', marginTop: '20px', textAlign: 'center' }}>Core System</h3>
            <p style={{ color: '#333' }}><strong>{frame['Core System']?.Name}:</strong> {frame['Core System']?.Description}</p>
          </div>
        )}
      </section>

      {/* Weapons Section */}
      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff', border: '2px solid #333', borderRadius: '8px', textAlign: 'left' }}>
        <h2 style={{ marginTop: '0', color: '#333', textAlign: 'center' }}>Weapons</h2>
        {weapons.map((weapon, index) => (
          <div key={index} style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
            <h3 style={{ marginTop: '0', color: '#333', textAlign: 'center' }}>{weapon.Name}</h3>
            <p style={{ color: '#333' }}><strong>Manufacturer:</strong> {weapon.Manufacturer}</p>
            <p style={{ color: '#333' }}><strong>License:</strong> {weapon.Liscense} (Level {weapon['Liscense Level']})</p>
            <p style={{ color: '#333' }}><strong>Mount:</strong> {weapon.Mount}</p>
            <p style={{ color: '#333' }}><strong>Weapon Type:</strong> {weapon['Weapon Type']}</p>
            <p style={{ color: '#333' }}><strong>Range/Threat:</strong> {weapon['Range/Threat']}</p>
            <p style={{ color: '#333' }}><strong>Damage:</strong> {weapon.Damage} ({weapon['Damage Type']})</p>
            <p style={{ color: '#333' }}><strong>Tags:</strong> {weapon.Tags?.join(', ')}</p>
            {weapon.Effect && <p style={{ color: '#333' }}><strong>Effect:</strong> {weapon.Effect}</p>}
            <p style={{ color: '#333' }}><strong>Description:</strong> {weapon.Description}</p>
          </div>
        ))}
      </section>

      {/* Systems Section */}
      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff', border: '2px solid #333', borderRadius: '8px', textAlign: 'left' }}>
        <h2 style={{ marginTop: '0', color: '#333', textAlign: 'center' }}>Systems</h2>
        {systems.map((system, index) => (
          <div key={index} style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
            <h3 style={{ marginTop: '0', color: '#333', textAlign: 'center' }}>{system.Name}</h3>
            <p style={{ color: '#333' }}><strong>Manufacturer:</strong> {system.Manufacturer}</p>
            <p style={{ color: '#333' }}><strong>License:</strong> {system.Liscense} (Level {system['Liscense Level']})</p>
            <p style={{ color: '#333' }}><strong>SP Cost:</strong> {system['SP Cost']}</p>
            <p style={{ color: '#333' }}><strong>Tags:</strong> {system.Tags?.join(', ')}</p>
            <p style={{ color: '#333' }}><strong>Effect:</strong> {system.Effect}</p>
            <p style={{ color: '#333' }}><strong>Description:</strong> {system.Description}</p>
          </div>
        ))}
      </section>

      {/* Core Bonuses Section */}
      <section style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#fff', border: '2px solid #333', borderRadius: '8px', textAlign: 'left' }}>
        <h2 style={{ marginTop: '0', color: '#333', textAlign: 'center' }}>Core Bonuses</h2>
        {coreBonuses.map((bonus, index) => (
          <div key={index} style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
            <h3 style={{ marginTop: '0', color: '#333', textAlign: 'center' }}>{bonus.Name}</h3>
            <p style={{ color: '#333' }}><strong>Manufacturer:</strong> {bonus.Manufacturer}</p>
            <p style={{ color: '#333' }}><strong>Source:</strong> {bonus.Source}</p>
            <p style={{ color: '#333' }}><strong>Description:</strong> {bonus.Description}</p>
            <p style={{ color: '#333' }}><strong>Effect:</strong> {bonus.Effect}</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default App
