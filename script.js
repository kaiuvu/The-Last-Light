const gameTextElement = document.getElementById('game-text');
const optionsContainer = document.getElementById('options-container');
const gameImageElement = document.getElementById('game-image');
const menuDiv = document.getElementById('menu');
const gameContainer = document.getElementById('game-container');
const jumpscareImg = document.getElementById('jumpscare-img');
const jumpscareDiv = document.getElementById('jumpscare');

// SAHNE ELEMENTLERİ
const screamSound = document.getElementById('scream-sound');
const lighterFlame = document.getElementById('lighter-flame');
const ironDoor = document.getElementById('iron-door');
const goodEndScreen = document.getElementById('good-end-screen');
const tableLamp = document.getElementById('table-lamp');
const burnBook = document.getElementById('burn-book');
const rustyKey = document.getElementById('rusty-key');
const shadow = document.querySelector('.shadow');
const bookFocus = document.getElementById('book-focus');
const bookImage = document.getElementById('book-image');

// MENÜ VE KONTROL ELEMENTLERİ
const playBtn = document.getElementById('play-btn');
const settingsBtn = document.getElementById('settings-btn');
const languageBtn = document.getElementById('language-btn');
const developerNameDiv = document.getElementById('developer-name'); // Yapımcı Adı elementi

// Ayarlar Paneli Elementleri
const settingsPanel = document.getElementById('settings-panel');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const musicVolumeInput = document.getElementById('music-volume');
const sfxVolumeInput = document.getElementById('sfx-volume');


// Sesler
const bgMusic = document.getElementById('bg-music');
const stepSound = document.getElementById('step-sound');
const jumpSound = document.getElementById('jump-scare-sound');
const radioCut = document.getElementById('radio-cut');
const sanityLossSound = document.getElementById('sanity-loss-sound');

// ------------------------------------------------------------------
// 🌎 DİL VE DURUM YÖNETİMİ
// ------------------------------------------------------------------
let currentLang = 'TR'; 
let gameState = { currentScene:'start', inventory:{hasKey:false, hasLighter:false} };

// TÜM OYUN METİNLERİNİ İÇEREN VERİTABANI
const texts = {
    // Menü Metinleri
    "menu_title": {"TR": "Odanın İçindeki Gölgeler", "EN": "Shadows Within The Room"},
    "btn_play": {"TR": "Oyna", "EN": "Play"},
    "btn_settings": {"TR": "Ayarlar", "EN": "Settings"},
    "btn_return_menu": {"TR": "MENÜYE DÖN", "EN": "RETURN TO MENU"},
    "btn_close": {"TR": "Kapat", "EN": "Close"},
    "title_settings": {"TR": "⚙️ Ayarlar", "EN": "⚙️ Settings"},
    "label_music": {"TR": "Müzik Sesi (BG Music):", "EN": "Music Volume (BG Music):"},
    "label_sfx": {"TR": "Efekt Sesi (SFX):", "EN": "SFX Volume:"},
    "text_developer": {"TR": "Yapımcı: Kaiuvu", "EN": "Developer: Kaiuvu"}, // YENİ: Yapımcı Metni
    "end_good_title": {"TR": "OYUN BİTTİ", "EN": "GAME OVER"},
    "end_good_subtitle": {"TR": "İYİ SON", "EN": "GOOD ENDING"},
    "end_good_text": {"TR": "Odadan çık (GÜÇLÜ SON)", "EN": "Exit the room (POWERFUL END)"},
    "end_good_success": {"TR": "Dışarıdan gelen ışık gözlerini kamaştırdı. Başarıyla kurtuldun. **İYİ SON: HAKİKATİN IŞIĞI**", "EN": "The light from outside blinded you. You successfully escaped. **GOOD ENDING: THE LIGHT OF TRUTH**"},
    
    // Kötü Son Metinleri
    "end_bad_1": {"TR": "KÖTÜ SON: HIZLI KARAR", "EN": "BAD ENDING: RASH DECISION"},
    "end_bad_2": {"TR": "KÖTÜ SON: MERAKIN BEDELİ", "EN": "BAD ENDING: COST OF CURIOSITY"},
    "end_bad_3": {"TR": "KÖTÜ SON: PASİFLİK", "EN": "BAD ENDING: PASSIVITY"},
    "end_bad_4": {"TR": "KÖTÜ SON: TUZAK", "EN": "BAD ENDING: THE TRAP"},
    "end_bad_5": {"TR": "KÖTÜ SON: AKIL KAYBI", "EN": "BAD ENDING: SANITY LOSS"},
    "btn_giveup": {"TR": "Daha fazla dayanamıyorsun...", "EN": "You can't bear it anymore..."},

    // Hikaye Sahne Metinleri
    "scene_start": {"TR": "Gözlerini açıyorsun. Etraf zifiri karanlık, masanın üzerindeki küçük bir lambanın ışığı var. Kafan uğulduyor. **'Burası neresi…?'**", "EN": "You open your eyes. It is pitch black, only a small lamp on the table provides light. Your head is pounding. **'Where am I...?'**"},
    "scene_check_room": {"TR": "Lamba ışığının zar zor aydınlattığı duvarda, kömür gibi yanmış bir iz görüyorsun. Tam o sırada, ışığın ulaşmadığı bir köşeden kısacık bir **gölge geçtiğini** fark ediyorsun.", "EN": "On the wall barely illuminated by the lamp, you see a charcoal-like burn mark. Just then, you notice a brief **shadow passing** in a corner beyond the light."},
    "scene_check_lamp": {"TR": "Masada paslanmış bir anahtar ve üzerinde yanık izleri olan küçük bir kitap duruyor.", "EN": "A rusty key and a small book with burn marks lie on the table."},
    "scene_focus_table": {"TR": "Masaya odaklanıyorsun. Anahtar ve kitap duruyor. Kapının kolu yok, etraf sessiz...", "EN": "You focus on the table. The key and the book are there. The door has no handle, the surroundings are silent..."},
    "scene_focus_table_with_key": {"TR": "Anahtarı aldın. Masayı incelerken lambanın ayağında küçük, gizli bir kapak fark ettin. Bu anahtar buraya ait olabilir mi?", "EN": "You took the key. Inspecting the table, you notice a small, hidden panel on the lamp's base. Could this key belong here?"},
    "scene_read_book": {"TR": "Kitabı açıyorsun. Sayfalardaki yanıklar 'Gölgeyi Besleme' yazısını zorlukla gösteriyor. Karanlık hızla yaklaşıyor ve kulaklarında uğultu hissediyorsun.", "EN": "You open the book. The burns on the pages barely show the writing: 'Do Not Feed The Shadow'. Darkness rapidly approaches, and you feel a buzzing in your ears."},
    "scene_sanity_loss": {"TR": "Kitabın sayfalarındaki şekiller anlamsız. Gözlerin acıyor. Etrafındaki sesler uğultuya dönüşüyor. Sanırım... sanırım psikolojim bozuluyor. Bu kitabı bırakmak istiyorum fakat bırakamıyorum.", "EN": "The figures on the book's pages are meaningless. Your eyes ache. The sounds around you turn into a hum. I think... I think I'm losing my mind. I want to put this book down, but I can't."},
    "scene_sanity_loss_cinematic": {"TR": "Sayfadaki imge, zihninin derinliklerine sızıyor. Gördüğün şey bir anda odanın duvarlarına, tavanına yayılıyor. Gerçeklik kayboluyor. Kontrol edemediğin bir çığlık atıyorsun. **Bitti.**", "EN": "The image on the page seeps into the depths of your mind. What you see suddenly spreads across the room's walls and ceiling. Reality fades. You let out an uncontrollable scream. **It's over.**"},
    "scene_find_lighter": {"TR": "Anahtarı kapağa takıp çevirdin. İçeride **küçük bir çakmak** buldun. Tam çakmağı cebine atarken, masadaki lamba TISSS sesiyle tamamen söndü! ODA ZİFİRİ KARANLIK OLDU!", "EN": "You inserted the key into the panel and turned it. Inside, you found a **small lighter**. Just as you put the lighter in your pocket, the lamp on the table made a SSSST sound and went completely dark! THE ROOM BECAME PITCH BLACK!"},
    "scene_good_end_light": {"TR": "Çakmağı yaktın. Küçücük alevin titrek ışığı, tam önünde belirginleşen **Gölge'nin yüzüne** vurdu. Gölge, sana dokunamadan çığlık atarak küle dönüştü. Odanın kapısı gıcırtıyla açıldı.", "EN": "You lit the lighter. The tiny, flickering flame hit the face of the **Shadow** that had materialized right in front of you. The Shadow shrieked and turned to ash before it could touch you. The room's door creaked open."},
    "scene_bad_end_wait_key": {"TR": "Beklemeyi seçtin. Tırmalama sesleri yaklaşıyor... Gölgenin nefesi ensende hissediliyor. Donup kalıyorsun.", "EN": "You chose to wait. Scratching sounds are getting closer... You can feel the Shadow's breath on your neck. You freeze."},
    "scene_bad_end_door_trap": {"TR": "Kapıyı zorlaman büyük bir hataydı. Tepeden ağır bir şey düşerek seni tuzağa düşürüyor. Gölge, hareket edemeyen bedenine doğru sinsice yaklaşıyor...", "EN": "Forcing the door was a big mistake. Something heavy falls from above, trapping you. The Shadow sneaks closer to your immobile body..."},
    "scene_shadow_jump": {"TR": "Gölge sana doğru fırlıyor!", "EN": "The Shadow lunges at you!"},
    
    // Seçenek Metinleri
    "opt_check_room": {"TR": "Odayı dikkatlice incele.", "EN": "Carefully inspect the room."},
    "opt_check_lamp": {"TR": "Lambaya doğru yürü ve daha yakından bak.", "EN": "Walk towards the lamp and look closer."},
    "opt_look_shadow": {"TR": "Gölgeye bak.", "EN": "Look at the Shadow."},
    "opt_focus_table": {"TR": "Masaya dön ve üzerindekilere odaklan.", "EN": "Return to the table and focus on the objects."},
    "opt_take_key": {"TR": "Anahtarı al.", "EN": "Take the key."},
    "opt_take_book": {"TR": "Kitabı al.", "EN": "Take the book."},
    "opt_open_book": {"TR": "Kitabı aç.", "EN": "Open the book."},
    "opt_open_panel": {"TR": "Hemen kapağı anahtarla aç.", "EN": "Immediately open the panel with the key."},
    "opt_force_door": {"TR": "Kapıyı zorla açmayı dene.", "EN": "Try to force the door open."},
    "opt_wait": {"TR": "Bekle ve odadaki sesleri dinle.", "EN": "Wait and listen to the sounds in the room."},
    "opt_read_more": {"TR": "Bekle ve daha fazla okumaya çalış.", "EN": "Wait and try to read more."},
    "opt_light_lighter": {"TR": "Hemen çakmağı yak!", "EN": "Immediately light the lighter!"},
    "opt_focus_image": {"TR": "Sayfadaki imgeye odaklan.", "EN": "Focus on the image on the page."},
};

// Çeviri yardımcı fonksiyonu
function t(key) {
    // Eğer o dilde metin yoksa, Türkçe metni döndür (Yedek)
    return texts[key][currentLang] || texts[key]['TR']; 
}

// Menü ve Arayüzü Güncelleyen Fonksiyon
function updateUIMenu() {
    document.querySelector('.menu-title').innerText = t('menu_title');
    document.getElementById('play-btn').innerText = t('btn_play');
    document.getElementById('settings-btn').innerText = t('btn_settings');
    document.getElementById('language-btn').innerText = `Dil: ${currentLang}`;
    developerNameDiv.innerText = t('text_developer'); // YENİ: Yapımcı adını güncelle
    
    // Ayarlar paneli metinlerini güncelle
    document.querySelector('#settings-panel h2').innerText = t('title_settings');
    document.querySelector('label[for="music-volume"]').innerText = t('label_music');
    document.querySelector('label[for="sfx-volume"]').innerText = t('label_sfx');
    document.getElementById('close-settings-btn').innerText = t('btn_close');

    // İyi Son Ekranı
    if(document.getElementById('good-end-screen').style.display === 'flex') {
        document.querySelector('.good-end-text').innerText = t('end_good_title');
        document.querySelector('.good-end-subtext').innerText = t('end_good_subtitle');
        const endBtn = document.querySelector('.good-end-button');
        if (endBtn) endBtn.innerText = t('btn_return_menu');
    }
}

// ------------------------------------------------------------------
// ⭐ DİL SEÇİMİ VE AYARLAR EVENT LISTENERS
// ------------------------------------------------------------------

// Dil Değiştirme
languageBtn.addEventListener('click', () => {
    currentLang = currentLang === 'TR' ? 'EN' : 'TR';
    languageBtn.innerText = `Dil: ${currentLang}`;
    updateUIMenu();
    
    // Eğer oyundaysa, sahneyi yeni dilde yeniden yükle
    if (gameContainer.style.display === 'block' && menuDiv.style.display === 'none') {
        goToScene(gameState.currentScene);
    }
});

// Menü butonu işlevi
playBtn.addEventListener('click', () => {
    menuDiv.style.display = 'none';
    gameContainer.style.display = 'block';
    bgMusic.play().catch(e => console.log("Müzik otomatik oynatma hatası:", e)); 
    goToScene('start');
});

// Ayarlar Aç/Kapa
settingsBtn.addEventListener('click', () => {
    updateUIMenu(); 
    settingsPanel.style.display = 'flex';
});

closeSettingsBtn.addEventListener('click', () => {
    settingsPanel.style.display = 'none';
});

// Başlangıç Ses Ayarları ve Event Listenerları
musicVolumeInput.addEventListener('input', () => {
    bgMusic.volume = musicVolumeInput.value / 100;
});
sfxVolumeInput.addEventListener('input', () => {
    const volume = sfxVolumeInput.value / 100;
    jumpSound.volume = volume;
    radioCut.volume = volume;
    screamSound.volume = volume;
    sanityLossSound.volume = volume;
});

// İlk çalıştırmada ses seviyelerini ayarla ve menüyü güncelle
bgMusic.volume = musicVolumeInput.value / 100;
const defaultSfxVolume = sfxVolumeInput.value / 100;
jumpSound.volume = defaultSfxVolume;
radioCut.volume = defaultSfxVolume;
screamSound.volume = defaultSfxVolume;
sanityLossSound.volume = defaultSfxVolume;

updateUIMenu(); 

// ------------------------------------------------------------------
// 📚 HİKAYE VERİ TABANI
// ------------------------------------------------------------------
const scenes = {
    'start': { textKey: "scene_start", animation: 'flash', options:[
            { textKey: "opt_check_room", nextScene:'check_room' },
            { textKey: "opt_check_lamp", nextScene:'check_lamp' }
        ]
    },
    'check_room': { textKey: "scene_check_room", animation: 'shake-light', options:[
            { textKey: "opt_look_shadow", nextScene:'shadow_jump' },
            { textKey: "opt_focus_table", nextScene:'focus_table' }
        ]
    },
    'check_lamp': { textKey: "scene_check_lamp", animation: 'flash', options:[
            { textKey: "opt_take_key", action:()=>{gameState.inventory.hasKey=true;}, nextScene:'focus_table_with_key' },
            { textKey: "opt_take_book", nextScene:'read_book' }
        ]
    },
    'focus_table': { textKey: "scene_focus_table", animation: 'blur', 
        action: () => { gameImageElement.classList.add('animate-blur'); setTimeout(() => gameImageElement.classList.remove('animate-blur'), 500); },
        options:[
            { textKey: "opt_take_key", action:()=>{gameState.inventory.hasKey=true;}, nextScene:'focus_table_with_key' },
            { textKey: "opt_open_book", nextScene:'read_book' }
        ]
    },
    'focus_table_with_key': { textKey: "scene_focus_table_with_key", animation: 'flash', options:[
            { textKey: "opt_open_panel", nextScene:'find_lighter' },
            { textKey: "opt_force_door", nextScene:'bad_end_door_trap' },
            { textKey: "opt_wait", nextScene:'bad_end_wait_key' }
        ]
    },
    'read_book': { textKey: "scene_read_book", animation: 'shake-light', options:[
            { textKey: "opt_read_more", nextScene:'sanity_loss' } 
        ]
    },
    'sanity_loss': { textKey: "scene_sanity_loss", animation: 'blur', options: [
            { textKey: "opt_focus_image", nextScene: 'sanity_loss_cinematic' } 
        ]
    },
    'sanity_loss_cinematic': { textKey: "scene_sanity_loss_cinematic", options: [] },
    'find_lighter': { textKey: "scene_find_lighter", animation: 'shake-hard',
        action: () => { 
            gameState.inventory.hasLighter = true; 
            gameImageElement.style.background = '#000';
            tableLamp.style.opacity = '0';
            burnBook.style.opacity = '0.1';
            rustyKey.style.opacity = '0.1';
            ironDoor.style.opacity = '0.1';
            shadow.style.opacity = '0.8'; 
        },
        options: [
            { textKey: "opt_light_lighter", nextScene: 'good_end_light' }
        ]
    },
    'good_end_light': { textKey: "scene_good_end_light", options: [
            { textKey: "end_good_text", nextScene: 'exit_room' }
        ]
    },
    'exit_room': { textKey: "end_good_success", options: [
            { textKey: "btn_return_menu", nextScene: 'menu' }
        ]
    },
    'bad_end_wait_key': { textKey: "scene_bad_end_wait_key", animation: 'shake-light', options:[{textKey:"...", nextScene:'jumpscare_3'}] },
    'bad_end_door_trap': { textKey: "scene_bad_end_door_trap", animation: 'shake-hard', options:[{textKey:"...", nextScene:'jumpscare_4'}] },
    'shadow_jump': { textKey:"scene_shadow_jump", animation: 'shake-hard', options:[]}, 
    'jumpscare_1': { textKey:"end_bad_1", options:[{textKey:"btn_return_menu", nextScene:'menu'}]},
    'jumpscare_2': { textKey:"end_bad_2", options:[{textKey:"btn_return_menu", nextScene:'menu'}]},
    'jumpscare_3': { textKey:"end_bad_3", options:[{textKey:"btn_return_menu", nextScene:'menu'}]},
    'jumpscare_4': { textKey:"end_bad_4", options:[{textKey:"btn_return_menu", nextScene:'menu'}]},
    'jumpscare_5': { textKey:"end_bad_5", options:[{textKey:"btn_return_menu", nextScene:'menu'}]},
    'menu': { textKey:"", options:[]}
};

// ------------------------------------------------------------------
// YARDIMCI FONKSİYONLAR
// ------------------------------------------------------------------

function applyAnimation(type) {
    if (type !== 'blur') { gameImageElement.classList.remove('animate-blur'); }
    const animationClass = `animate-${type}`;
    gameImageElement.classList.add(animationClass);
    setTimeout(() => { gameImageElement.classList.remove(animationClass); }, 500);
}

function typeWriter(text, callback){
    gameTextElement.innerHTML='';
    let i=0;
    function type(){
        if(i<text.length){ gameTextElement.innerHTML+=text.charAt(i); i++; setTimeout(type,35);}
        else if(callback) callback();
    }
    optionsContainer.style.pointerEvents='none';
    optionsContainer.style.opacity='0.5';
    type();
}

function applyJumpscare(sceneId, nextTextKey, nextSceneId){
    bgMusic.pause();
    radioCut.play();
    jumpSound.play();
    
    jumpscareDiv.style.display='flex';
    jumpscareImg.src = 'jump.png'; 
    jumpscareImg.style.display='block'; 
    
    gameTextElement.innerHTML = currentLang === 'TR' ? "💥 KORKU 💥" : "💥 JUMPSCARE 💥"; 
    
    setTimeout(()=>{
        jumpscareImg.style.display='none'; 
        jumpscareDiv.style.display='none';
        
        gameTextElement.innerHTML = `<h1 style="color: #e50000; text-align:center;">${t(nextTextKey)}</h1>`;
        optionsContainer.innerHTML='';
        
        const btn=document.createElement('button');
        btn.classList.add('game-option');
        btn.innerText=t('btn_return_menu');
        btn.addEventListener('click',() => {
            bgMusic.pause();
            bgMusic.currentTime = 0;
            jumpSound.currentTime = 0;
            radioCut.currentTime = 0;
            
            gameContainer.style.display = 'none';
            menuDiv.style.display = 'flex';
        });
        optionsContainer.appendChild(btn);

    }, 1500); 
}

function applySanityLossCinematic(){
    bgMusic.pause();
    
    gameImageElement.style.background = '#000';
    [tableLamp, burnBook, rustyKey, shadow, ironDoor].forEach(el => el.style.opacity = '0');
    bookFocus.style.display = 'flex';
    
    sanityLossSound.play();
    sanityLossSound.volume = sfxVolumeInput.value / 100; 

    setTimeout(() => {
        bookImage.style.filter = 'brightness(1) saturate(1)';
    }, 100);

    const sanityText = t(scenes['sanity_loss_cinematic'].textKey);

    typeWriter(sanityText, ()=>{
        optionsContainer.style.pointerEvents='auto';
        optionsContainer.style.opacity='1';
        optionsContainer.innerHTML='';
        
        const endBtn = document.createElement('button');
        endBtn.classList.add('game-option');
        endBtn.innerText = t('btn_giveup');
        
        endBtn.addEventListener('click', () => {
            goToScene('jumpscare_5'); 
        });
        optionsContainer.appendChild(endBtn);
    });
}

// ------------------------------------------------------------------
// ⚙️ OYUN ÇEKİRDEK FONKSİYONLARI
// ------------------------------------------------------------------

function goToScene(sceneId){
    const scene=scenes[sceneId];
    if (!scene) {
        if (sceneId === 'menu') {
            gameContainer.style.display = 'none';
            menuDiv.style.display = 'flex';
            
            // Sıfırlama
            gameImageElement.style.background = 'radial-gradient(circle at 40% 70%, rgba(255, 255, 150, 0.15) 0%, rgba(0, 0, 0, 1) 70%), repeating-linear-gradient(90deg, #181818, #181818 10px, #111 10px, #111 20px), #000';
            [tableLamp, burnBook, rustyKey, ironDoor].forEach(el => el.style.opacity = '1');
            shadow.style.opacity = '0.7';
            shadow.style.transition = 'opacity 5s linear, filter 5s linear';
            goodEndScreen.style.display = 'none';
            lighterFlame.style.display = 'none';
            bookFocus.style.display = 'none';
            
            sanityLossSound.pause();
            sanityLossSound.currentTime = 0; 
            
            gameTextElement.style.display = 'block';
            optionsContainer.style.display = 'flex';

            updateUIMenu(); 
            
            return;
        }
        return console.error("Sahne bulunamadı:", sceneId);
    }
    gameState.currentScene=sceneId;

    if (scene.action) {
        scene.action();
    }
    
    // Psikolojik Son Kontrolü
    if (sceneId === 'sanity_loss_cinematic') {
        applySanityLossCinematic();
        return;
    } 
    
    // Geleneksel Jumpscare Kontrolü
    else if(sceneId.includes('jumpscare') || sceneId === 'shadow_jump'){
        const targetSceneId = (sceneId === 'shadow_jump' ? 'jumpscare_1' : sceneId);
        applyJumpscare(
            targetSceneId, 
            scenes[targetSceneId].textKey, 
            scenes[targetSceneId].options[0].nextScene
        );
        return; 
    }

    // İyi Son Sinematik Kontrolü
    if (sceneId === 'good_end_light') {
        optionsContainer.innerHTML = ''; 
        bgMusic.pause();
        
        lighterFlame.style.display = 'block';
        screamSound.play();
        
        shadow.style.opacity = '0';
        shadow.style.filter = 'blur(10px) brightness(5)'; 

        typeWriter(t(scene.textKey), () => {});

        setTimeout(() => {
            screamSound.pause();
            lighterFlame.style.display = 'none';
            
            ironDoor.classList.add('glowing-door');
            ironDoor.style.opacity = '1';

            setTimeout(() => {
                goodEndScreen.style.display = 'flex';
                gameTextElement.style.display = 'none';
                optionsContainer.style.display = 'none';

                document.querySelector('.good-end-text').innerText = t('end_good_title');
                document.querySelector('.good-end-subtext').innerText = t('end_good_subtitle');
                
                if (!document.querySelector('.good-end-button')) {
                    const btn = document.createElement('button');
                    btn.classList.add('good-end-button');
                    btn.innerHTML = t('btn_return_menu');
                    btn.addEventListener('click', () => {
                        btn.remove();
                        goToScene('menu');
                    });
                    
                    goodEndScreen.appendChild(btn);
                }

            }, 2000); 

        }, 5000); 

        return; 
    }
    
    // Sahne Animasyonu Uygulama
    if (scene.animation) {
        applyAnimation(scene.animation);
    }
    
    // Normal Sahne Akışı
    typeWriter(t(scene.textKey), ()=>{ 
        optionsContainer.style.pointerEvents='auto';
        optionsContainer.style.opacity='1';
        optionsContainer.innerHTML='';
        
        scene.options.forEach(option=>{
            if(option.requiredItem && !gameState.inventory[option.requiredItem]) return;
            
            const btn=document.createElement('button');
            btn.classList.add('game-option');
            btn.innerHTML=t(option.textKey); 
            
            btn.addEventListener('click',()=>{
                if(option.action) option.action();
                goToScene(option.nextScene);
            });
            optionsContainer.appendChild(btn);
        });
    });
}