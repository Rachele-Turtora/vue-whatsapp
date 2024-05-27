const { createApp } = Vue

const answers = ["Ciao", "Tutto bene, grazie", "Non capisco...", "Purtroppo, al momento non posso rispondere a questa domanda.", "Mi dispiace, non ho capito la tua domanda. Potresti riformularla?", "Eccomi, pronto ad aiutarti! Cosa desideri sapere?"];

const contacts = [
    {
        name: 'Michele',
        avatar: './img/avatar_1.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
            },
            {
                date: '10/01/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Fabio',
        avatar: './img/avatar_2.jpg',
        visible: true,
        messages: [
            {
                date: '20/03/2020 16:30:00',
                message: 'Ciao come stai?',
                status: 'sent'
            },
            {
                date: '20/03/2020 16:30:55',
                message: 'Bene grazie! Stasera ci vediamo?',
                status: 'received'
            },
            {
                date: '20/03/2020 16:35:00',
                message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Samuele',
        avatar: './img/avatar_3.jpg',
        visible: true,
        messages: [
            {
                date: '28/03/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            },
            {
                date: '28/03/2020 10:20:10',
                message: 'Sicuro di non aver sbagliato chat?',
                status: 'sent'
            },
            {
                date: '28/03/2020 16:15:22',
                message: 'Ah scusa!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro B.',
        avatar: './img/avatar_4.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Si, ma preferirei andare al cinema',
                status: 'received'
            }
        ],
    },
    {
        name: 'Alessandro L.',
        avatar: './img/avatar_5.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ricordati di chiamare la nonna',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Va bene, stasera la sento',
                status: 'received'
            }
        ],
    },
    {
        name: 'Claudia',
        avatar: './img/avatar_6.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao Claudia, hai novità?',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Non ancora',
                status: 'received'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'Nessuna nuova, buona nuova',
                status: 'sent'
            }
        ],
    },
    {
        name: 'Federico',
        avatar: './img/avatar_7.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Fai gli auguri a Martina che è il suo compleanno!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'Grazie per avermelo ricordato, le scrivo subito!',
                status: 'received'
            }
        ],
    },
    {
        name: 'Davide',
        avatar: './img/avatar_8.jpg',
        visible: true,
        messages: [
            {
                date: '10/01/2020 15:30:55',
                message: 'Ciao, andiamo a mangiare la pizza stasera?',
                status: 'received'
            },
            {
                date: '10/01/2020 15:50:00',
                message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                status: 'sent'
            },
            {
                date: '10/01/2020 15:51:00',
                message: 'OK!!',
                status: 'received'
            }
        ],
    }
];

  createApp({
    data() {
      return {
        contacts : contacts,
        answers: answers,
        currentIndex: 0,
        newMessage: "",
        searchedContacts: "",
        messageIndex: null,
        isVisible: false,
        displayLeft: true,
        displayRight: false,
        isTyping: false,
        timeoutTyping: null,
        searchIcon: false,
        searchedMessage: "",
        removeChat: false
      }
    },

    methods: {

        handleClick(i){
            if(i >= 0){
                this.currentIndex = i;
                this.messageIndex = null;
                this.searchedMessage = "";
                this.searchIcon = false;
                this.removeChat = false
            }
            
            if (window.innerWidth <= 576){
                if (this.displayLeft == true){
                    this.displayLeft = false;
                    this.displayRight = true;
                } else {
                    this.displayLeft = true;
                    this.displayRight = false;
                }
            }
        },

        // Send new message
        handleNewMessage(i){
            const time = luxon.DateTime.now().setLocale('it').toFormat('TT')
            if (this.newMessage){    

                this.addMessage(i, time);
                this.newMessage = "";

                this.$nextTick(this.scrollToBottom); // "this.$nextTick" assicura che il metodo scrollToBottom() venga eseguito solo dopo che il DOM è stato aggiornato con il nuovo messaggio
    
                this.typing();

                setTimeout(() => {

                    const num = Math.floor(Math.random() * 6);
                    this.receiveMessage(i, time, num);

                    this.$nextTick(this.scrollToBottom);

                    this.isTyping = false;
                }, 1000);
                
            }
        },

        addMessage(i, time){
            return this.contacts[i].messages.push({
                date: time,
                message: this.newMessage,
                status: 'sent'
            })
        },

        receiveMessage(i, time, num){
            return this.contacts[i].messages.push({
                date: time,
                message: this.answers[num],
                status: 'received'
            })
        },

        typing(){
            this.isTyping = true;

            if (this.timeoutTyping) {
                clearTimeout(this.timeoutTyping);
            }

            this.timeoutTyping = setTimeout(function(){
                this.isTyping = false;
            }, 1000);
        },

        // Automatic scroll
        scrollToBottom(){
            const container = this.$refs.messagesContainer;     // "$refs" contiene le referenze a elementi DOM o componenti figlio che hanno un attributo ref; è utile per accedere direttamente a elementi specifici nel DOM
            container.scrollTop = container.scrollHeight;
        },

        // Search functions
        searchContacts(){
            if (this.searchedContacts){
                return this.contacts.map((element) => {
                    if(element.name.toLowerCase().includes(this.searchedContacts.toLowerCase())){
                        return {...element}
                    } else {
                        return {...element, visible: false}
                    }
                })
            } else {
                return this.contacts;
            }
            
        },

        searchMessage(i){
            if (!this.contacts[i]) {
                return [];
            }

            if(this.searchedMessage){
                return this.contacts[i].messages.filter((element) => {
                    return element.message.toLowerCase().includes(this.searchedMessage.toLowerCase());
                });
            } else {
                return this.contacts[i].messages;
            }
        },

        // Delete functions
        deleteMessage(contactIndex, messageIndex){
            this.contacts[contactIndex].messages = this.contacts[contactIndex].messages.filter((_, i) => {
                return i !== messageIndex;
            })

            this.messageIndex = null;
        },

        removeThisChat(index){
            if (this.contacts.length == 1){
                this.currentIndex = -1
                this.contacts = []
            } else if (index == this.contacts.length - 1){
                this.contacts = this.contacts.filter((_, i) => {
                    return i !== index;
                })
                this.currentIndex -= 1;
            } else {
                this.contacts = this.contacts.filter((_, i) => {
                    return i !== index;
                })
            } 
            
            this.toggleRemoveChat()
        },

        // Toggle functions
        toggleSearchMessage(){
            this.searchIcon = !this.searchIcon
        },

        toggleMenu(i){
            if (this.messageIndex !== i){
                this.messageIndex = i;
            } else {
                this.messageIndex = null;
            }
        },

        toggleRemoveChat(){
            this.removeChat = !this.removeChat
        }
    }
  }).mount('#app')