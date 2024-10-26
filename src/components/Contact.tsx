import React, { useState } from 'react';
import SocialMedia from './utils/SocialMedia';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://seu-endpoint-api.com/enviar', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar a mensagem');
      }

      setFormData({ name: '', email: '', message: '' });
      alert('Mensagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao enviar a mensagem.');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Deixe uma mensagem</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="contact-label" htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="Adalberto da Silva"
            />
          </div>
          <div>
            <label className="contact-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="contact-input"
              placeholder="Email@exemplo.com"
            />
          </div>
          <div>
            <label className="contact-label" htmlFor="message">Mensagem</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="contact-textarea"
              rows={5}
              placeholder="Gostei do seu trabalho, quero saber mais sobre você"
            ></textarea>
          </div>
          <div className="contact-button-container">
            <button type="submit" className="contact-button">
              Enviar
            </button>
          </div>
        </form>
        <SocialMedia />
      </div>
    </section>
  );
}

export default Contact;
