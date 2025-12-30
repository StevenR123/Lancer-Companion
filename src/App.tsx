import { useState, useEffect } from 'react'
import './App.css'

// Import the mech data
import mechData from './Example Mech/Blackbeard-1.1.json'

// Import all Lancer Data using glob
const framesContext = import.meta.glob('./Lancer Data/Frame/*.json', { eager: true })
const systemsContext = import.meta.glob('./Lancer Data/System/*.json', { eager: true })
const weaponsContext = import.meta.glob('./Lancer Data/Weapon/*.json', { eager: true })
const coreBonusesContext = import.meta.glob('./Lancer Data/Core Bonus/*.json', { eager: true })

// Convert imported modules to arrays
const allFrames = Object.values(framesContext).map((mod: any) => mod.default)
const allSystems = Object.values(systemsContext).map((mod: any) => mod.default)
const allWeapons = Object.values(weaponsContext).map((mod: any) => mod.default)
const allCoreBonuses = Object.values(coreBonusesContext).map((mod: any) => mod.default)

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
  const loadedMech = mechData as MechData
  setMech(loadedMech)

  // Find and load frame data based on mech's frame name
  const frameData = allFrames.find((f: any) => f.Name === loadedMech.Frame)
  if (frameData) setFrame(frameData as FrameData)

  // Find and load systems based on mech's systems array
  const systemsData = loadedMech.Systems.map((systemName: string) => 
   allSystems.find((s: any) => s.Name === systemName)
  ).filter(Boolean)
  setSystems(systemsData as SystemData[])

  // Find and load weapons based on mech's weapons array
  const weaponsData = loadedMech.Weapons.map((weaponName: string) => 
   allWeapons.find((w: any) => w.Name === weaponName)
  ).filter(Boolean)
  setWeapons(weaponsData as WeaponData[])

  // Find and load core bonuses based on mech's core bonuses array
  const coreBonusesData = loadedMech['Core Bonuses'].map((bonusName: string) => 
   allCoreBonuses.find((b: any) => b.Name === bonusName)
  ).filter(Boolean)
  setCoreBonuses(coreBonusesData as CoreBonusData[])
 }, [])

 if (!mech) return <div>Loading...</div>

 return (
  <div className="app-container">
   {/* Mech Name and Pilot Section */}
   <section className="section section-header">
    <h1 className="header-white">{mech.Name}</h1>
    <p className="text-white"><strong>Pilot:</strong> {mech.Pilot}</p>
   </section>

   {/* Frame Section */}
   <section className="section section-content">
    <h2 className="header-center">Frame: {mech.Frame}</h2>
    {frame && (
     <div className="column-margin">
      <p ><strong>Manufacturer:</strong> {frame.Manufacturer}</p>
      <p ><strong>Role:</strong> {frame.Role}</p>
      
      {/* Two Column Layout for Description and Core Stats */}
      <div className="two-column column-margin">             
       {/* Left Column - Core Stats */}
       <div className="column">
        <h3 className="header-center">Core Stats</h3>
        <p ><strong>Size:</strong> {frame['Core Stats']?.Size} | <strong> Armor:</strong> {frame['Core Stats']?.Armor} |<strong> Save Target:</strong> {frame['Core Stats']?.['Save Target']} |<strong> Sensors:</strong> {frame['Core Stats']?.Sensors}</p>
        <p ><strong>HP:</strong> {frame['Core Stats']?.Hull?.HP} | <strong>Repair Cap:</strong> {frame['Core Stats']?.Hull?.['Repair Cap']}</p>
        <p ><strong>Evasion:</strong> {frame['Core Stats']?.Agility?.Evasion} | <strong>Speed:</strong> {frame['Core Stats']?.Agility?.Speed}</p>
        <p ><strong>E-Defense:</strong> {frame['Core Stats']?.Systems?.['E-Defense']} | <strong>Tech Attack:</strong> {frame['Core Stats']?.Systems?.['Tech Attack']} | <strong>SP:</strong> {frame['Core Stats']?.Systems?.SP}</p>
        <p ><strong>Heat Cap:</strong> {frame['Core Stats']?.Engineering?.['Heat Cap']}</p>
       </div>
       {/* Right Column - Description */}
       <div className="column">
        <h3 className="header-center">Description</h3>
        <p >{frame.Description}</p>
       </div>
      </div>
      
      {/* Two Column Layout for Traits and Core System */}
      <div className="two-column column-margin-top">
       {/* Left Column - Traits */}
       <div className="column">
        <h3 className="header-center">Traits</h3>
        {frame.Traits?.map((trait: any, idx: number) => (
         <div key={idx} className="section-spacing">
          <p ><strong>{trait.Name}:</strong> {trait.Effect}</p>
         </div>
        ))}
       </div>
       
       {/* Right Column - Core System */}
       <div className="column">
        <h3 className="header-center">Core System</h3>
        <p ><strong>{frame['Core System']?.Name}:</strong> {frame['Core System']?.Description}</p>
       </div>
      </div>
      
      <h3 className="header-center column-margin-top">Mounts</h3>
      <p className="text-primary text-center">{frame.Mounts?.join(', ')}</p>
     </div>
    )}
   </section>

   {/* Weapons Section */}
   <section className="section section-content">
    <h2 className="header-center">Weapons</h2>
    {weapons.map((weapon, index) => (
     <div key={index} className="item-card">
      <h3 className="header-center">{weapon.Name}</h3>
      
      {/* Two Column Layout for Weapon Stats and Effect/Description */}
      <div className="two-column">
       {/* Left Column - Basic Stats */}
       <div className="column">
        <p ><strong>Manufacturer:</strong> {weapon.Manufacturer}</p>
        <p ><strong>License:</strong> {weapon.Liscense} (Level {weapon['Liscense Level']})</p>
        <p ><strong>Mount:</strong> {weapon.Mount}</p>
        <p ><strong>Weapon Type:</strong> {weapon['Weapon Type']}</p>
        <p ><strong>{weapon['Weapon Type'] === 'Melee' ? 'Threat' : 'Range'}:</strong> {weapon['Range/Threat']}</p>
        <p ><strong>Damage:</strong> {weapon.Damage} ({weapon['Damage Type']})</p>
        <p ><strong>Tags:</strong> {weapon.Tags?.join(', ')}</p>
        {weapon.Effect && (
         <div className="section-spacing">
          <p ><strong>Effect:</strong></p>
          <p >{weapon.Effect}</p>
         </div>
        )}
       </div>
       
       {/* Right Column - Effect and Description */}
       <div className="column">        
        <p ><strong>Description:</strong></p>
        <p >{weapon.Description}</p>
       </div>
      </div>
     </div>
    ))}
   </section>

   {/* Systems Section */}
   <section className="section section-content">
    <h2 className="header-center">Systems</h2>
    {systems.map((system, index) => (
     <div key={index} className="item-card">
      <h3 className="header-center">{system.Name}</h3>
      
      {/* Two Column Layout for System Stats and Description */}
      <div className="two-column">
       {/* Left Column - Basic Info */}
       <div className="column">
        <p ><strong>Manufacturer:</strong> {system.Manufacturer}</p>
        <p ><strong>License:</strong> {system.Liscense} (Level {system['Liscense Level']})</p>
        <p ><strong>SP Cost:</strong> {system['SP Cost']}</p>
        <p ><strong>Tags:</strong> {system.Tags?.join(', ')}</p>
        <p ><strong>Effect:</strong> {system.Effect}</p>
       </div>
       
       {/* Right Column - Description */}
       <div className="column">
        <p ><strong>Description:</strong></p>
        <p >{system.Description}</p>
       </div>
      </div>
     </div>
    ))}
   </section>

   {/* Core Bonuses Section */}
   <section className="section section-content">
    <h2 className="header-center">Core Bonuses</h2>
    {coreBonuses.map((bonus, index) => (
     <div key={index} className="item-card">
      <h3 className="header-center">{bonus.Name}</h3>
      
      {/* Two Column Layout for Core Bonus Info and Description */}
      <div className="two-column">
       {/* Left Column - Basic Info */}
       <div className="column">
        <p ><strong>Manufacturer:</strong> {bonus.Manufacturer}</p>
        <p ><strong>Effect:</strong> {bonus.Effect}</p>
       </div>
       
       {/* Right Column - Description */}
       <div className="column">
        <p ><strong>Description:</strong></p>
        <p >{bonus.Description}</p>
       </div>
      </div>
     </div>
    ))}
   </section>
  </div>
 )
}

export default App
