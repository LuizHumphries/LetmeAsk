import { useAuth } from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import darklogoImg from '../assets/images/darklogo.svg'
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase';
import { useTheme } from '../hooks/useTheme';
import Switch from 'react-switch'

export function NewRoom() {



  const { user } = useAuth();
  const history = useHistory()
  const [newRoom, setNewRoom] = useState('');
  const { theme, toggleTheme } = useTheme();


  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === "") {
      return;
    }
    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/admin/rooms/${firebaseRoom.key}`)

  }


  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire dúvidas de sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={theme === 'light' ? logoImg : darklogoImg} alt="Letmeask" />

          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
      <header>
        <Switch
          onChange={toggleTheme}
          checked={theme === 'dark'}
          checkedIcon={false}
          uncheckedIcon={false}
          height={10}
          width={30}
          handleDiameter={20}
          onColor='#C8C8C8'
        />
      </header>
    </div>
  )
}
