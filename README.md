# test-iliad

Scopo della web app:

- Login

- Registrazione utente con i seguenti campi obbligatori: Nome, Cognome, Data nascita, Città nascita, Codice Fiscale, Sesso

- Tabella con operazioni CRUD sugli elementi

Tecnologie utilizzate:

- HTML
- CSS
- Javascript
- Vue JS
- Bootstrap

Ho integrato 2 API:

- Una per la registrazione: https://mock-api.binaryboxtuts.com/

- Una per l'integrazione dei prodotti nella Dashboard: https://dummyjson.com/docs/products

Ho creato le CRUD per la creazione, modifica ed eliminazione dei prodotti. Tutto ovviamente fake in quanto non è possibile fare modifiche direttamente sull'API.

Infatti, per la modifica e la creazione del prodotto, una volta premuto il pulsante di conferma delle modifiche, ho implementato un alert che avvisa l'utente che la modifica/creazione è avvenuta correttamente.

Per la creazione del nuovo prodotto basterà premere il bottone 'Crea un nuovo prodotto' che reindirizzerà l'utente sulla pagina della creazione.

Per quanto riguarda l'eliminazione, premendo il bottone con il cestino andremo ad eliminare il prodotto fino ad un nuovo aggiornamento della pagina.

Istruzione per l'avvio della web app:

- Clonare il progetto da GitHub

- Installare le dipendenze da terminale: 'npm i'

- Avviare il server di sviluppo, lanciare da terminale: 'npm run serve'

- Andare sul browser e accedere all'URL locale: 'http://localhost:8080'
