import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

import api from '../../services/api';

import './styles.css';

function TeacherForm() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [biografia, setBiografia] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    {
      week_day: 0,
      from: '',
      to: '',
    },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: '',
        to: '',
      },
    ]);
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
      if (index === position) return { ...scheduleItem, [field]: value };

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItem);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api
      .post('classes', {
        name,
        avatar,
        whatsapp,
        bio: biografia,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        history.push('/');
      })
      .catch(() => {
        alert('Erro no cadastro!');
      });
  }

  return (
    <div id='page-teacher-form' className='container'>
      <PageHeader
        title='Que incrível que você que dar aulas.'
        description='O primeiro passo é preencher esse formulário de inscrição'
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name='name'
              label='Nome completo'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></Input>
            <Input
              name='avatar'
              label='Avatar'
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            ></Input>
            <Input
              name='whatsapp'
              label='WhatsApp'
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            ></Input>
            <Textarea
              name='bio'
              label='Biografia'
              value={biografia}
              onChange={(e) => {
                setBiografia(e.target.value);
              }}
            ></Textarea>
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name='subject'
              label='Matéria'
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              options={[
                { value: 'Lógica de Programação', label: 'Lógica de Programação' },
                { value: 'Cálculo', label: 'Cálculo' },
                { value: 'Banco de Dados', label: 'Banco de Dados' },
                { value: 'Estrutura de Dados', label: 'Estrutura de Dados' },
                { value: 'Compiladores', label: 'Compiladores' },
                { value: 'Matemática Discreta', label: 'Matemática Discreta' },
                { value: 'Gestão de Projetos', label: 'Gestão de Projetos' },
                { value: 'Linguagem de Programação', label: 'Linguagem de Programação' },
              ]}
            ></Select>
            <Input
              name='cost'
              label='Custo da sua hora por aula'
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            ></Input>
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type='button' onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className='schedule-item'>
                  <Select
                    name='week_day'
                    label='Dia da Semana'
                    value={scheduleItem.week_day}
                    onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-Feira' },
                      { value: '2', label: 'Terça-Feira' },
                      { value: '3', label: 'Quarta-Feira' },
                      { value: '4', label: 'Quinta-Feira' },
                      { value: '5', label: 'Sexta-Feira' },
                      { value: '6', label: 'Sábado' },
                    ]}
                  ></Select>
                  <Input
                    name='from'
                    label='Das'
                    type='time'
                    value={scheduleItem.from}
                    onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                  ></Input>
                  <Input
                    name='to'
                    label='Até'
                    type='time'
                    value={scheduleItem.to}
                    onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                  ></Input>
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt='Aviso importante' />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type='submit'>Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
