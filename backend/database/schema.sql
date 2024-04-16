DROP TABLE IF EXISTS song;

DROP TABLE IF EXISTS user;

DROP TABLE IF EXISTS score;

/* -------- CREATE -------- */

CREATE TABLE song (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, title VARCHAR(80) NOT NULL, link VARCHAR(255) NOT NULL, embed VARCHAR(255) NOT NULL, game VARCHAR(80) NOT NULL
);

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, pseudo VARCHAR(40) NOT NULL, hashed_password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, created_date DATETIME NOT NULL DEFAULT NOW(), updated_date DATETIME NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP, is_admin BOOL NOT NULL
);

CREATE TABLE score (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, username VARCHAR(5) NOT NULL, points INT NOT NULL
);

/* -------- INSERT -------- */

INSERT INTO
    user (
        pseudo, hashed_password, email, created_date, is_admin
    )
VALUES (
        'Willoo', '$argon2id$v=19$m=19,t=2,p=1$c3QyaVhGQmNBVXdIdmhkUg$DJNjJKmE70KXqA', 'blindtestAdmin@gmail.com', NOW(), 1
    );

INSERT INTO
    song (title, link, embed, game)
VALUES (
        'Death by Glamour', 'https://youtu.be/2TgO-tN5wAM?si=uGo6HUZXWQqhIMwF', 'https://www.youtube.com/embed/2TgO-tN5wAM?autoplay=1&si=B-ED1q_sAMPwpKma', 'UNDERTALE'
    ),
    (
        'MEGALOVANIA', 'https://youtu.be/wDgQdr8ZkTw?si=kk6TtEwM-v1EgRlW', 'https://www.youtube.com/embed/wDgQdr8ZkTw?autoplay=1&si=IFYLCpO-OREBRprC', 'UNDERTALE'
    ),
    (
        'Fallen Down', 'https://youtu.be/B69GfSqEZEs?si=HeUPEYoTnMFR90l-', 'https://www.youtube.com/embed/B69GfSqEZEs?autoplay=1&si=gTPFoVNXD0YN7EjJ', 'UNDERTALE'
    ),
    (
        'Eastward', 'https://youtu.be/suBIjcU5lUk?si=DVQ1egLfSGd4rZ4R', 'https://www.youtube.com/embed/suBIjcU5lUk?autoplay=1&si=pxyjauipKRbf_jBl', 'Eastward'
    ),
    (
        'Main Theme', 'https://youtu.be/zeKE0NHUtUw?si=K6PZ3frABWwT6K6z', 'https://www.youtube.com/embed/zeKE0NHUtUw?autoplay=1&si=lgNoj9-KLwq9w3gy', 'Super Smash Bros. Brawl'
    ),
    (
        'Home Call', 'https://youtu.be/5XtdyAMbfvA?si=dIHgU8hPW4d5IAly', 'https://www.youtube.com/embed/5XtdyAMbfvA?autoplay=1&si=cp_hi7gqEV-947w8', 'Road 96'
    ),
    (
        'Les Plaines d''Amakna', 'https://youtu.be/FMS7d0fAcLA?si=k_dQP0MsAOU9F-nL', 'https://www.youtube.com/embed/FMS7d0fAcLA?autoplay=1&si=Pqc6P1AzjqAeZqC_', 'Dofus'
    ),
    (
        'Bonta la Céleste', 'https://youtu.be/QVeJHJDVwUw?si=svAQ4yJ-mKSORTV0', 'https://www.youtube.com/embed/QVeJHJDVwUw?autoplay=1&si=6usUcaBpRg1eRWYd', 'Dofus'
    ),
    (
        'Resurrections', 'https://youtu.be/1rwAvUvvQzQ?si=-SfjKz1IPZ0CWU3n', 'https://www.youtube.com/embed/1rwAvUvvQzQ?autoplay=1&si=tA4zffsNC_52VikR', 'Celeste'
    ),
    (
        'First Steps', 'https://youtu.be/N8OHSXvneOE?si=W7rpJyZvWzWqhCPS', 'https://www.youtube.com/embed/N8OHSXvneOE?autoplay=1&si=meNwCLWYDL7CtjmI', 'Celeste'
    ),
    (
        'Ori, Lost in the Storm', 'https://youtu.be/U-tWqEod9Ig?si=I9K4D9DbRGX9xtCp', 'https://www.youtube.com/embed/U-tWqEod9Ig?autoplay=1&si=UtuEkzU1Hzz654oq', 'Ori and the Blind Forest'
    ),
    (
        'Light of Nibel', 'https://youtu.be/t6vWDz5NzOY?si=N3lCMsnY5CsoN5ay', 'https://www.youtube.com/embed/t6vWDz5NzOY?autoplay=1&si=ZyQ_61jDvzNNP0JJ', 'Ori and the Blind Forest'
    ),
    (
        'Dirtmouth', 'https://youtu.be/NSlkW1fFkyo?si=kwxtYZmYsZhilQ_p', 'https://www.youtube.com/embed/NSlkW1fFkyo?autoplay=1&si=oaTlv_mAEB74AGbx', 'Hollow Knight'
    ),
    (
        'Greenpath', 'https://youtu.be/fWquuWkHVP4?si=39mIgkubgfDMRD1H', 'https://www.youtube.com/embed/fWquuWkHVP4?autoplay=1&si=O5bV-g8C4pUpX0Xs', 'Hollow Knight'
    ),
    (
        'Professor Layton''s Theme', 'https://youtu.be/GYlpoteRT6o?si=YoggOwzVSPOpHjpT', 'https://www.youtube.com/embed/GYlpoteRT6o?autoplay=1&si=jSlsHQXWHYYbhU-9', 'Professeur Layton et l''étrange village'
    ),
    (
        'Pokémon Red & Blue : Opening Theme', 'https://youtu.be/NdJQopRuH1E?si=XxT3Jq9T7bs6kdL_', 'https://www.youtube.com/embed/NdJQopRuH1E?autoplay=1&si=fsuzK0p9U66PwiNX', 'Pokemon Rouge/Bleu'
    ),
    (
        'Dragonborn', 'https://youtu.be/6fILxnBH1Tg?si=fPPABkLED7gI9nGg', 'https://www.youtube.com/embed/6fILxnBH1Tg?si=r9Ey2wfh5ydV-nKh&amp;start=15&autoplay=1', 'The Elder Scrolls V : Skyrim'
    ),
    (
        'Subwoofer Lullaby', 'https://youtu.be/o3_InDEtpLA?si=e6_M-EMKZO_JgDt5', 'https://www.youtube.com/embed/o3_InDEtpLA?autoplay=1&si=e6_M-EMKZO_JgDt5', 'Minecraft'
    ),
    (
        'Sweden', 'https://youtu.be/xIQrC4CerB8?si=gX9s-baZfwYMCS_S', 'https://www.youtube.com/embed/xIQrC4CerB8?si=aOTAEZB-Wl-dorGD&amp;start=32&autoplay=1', 'Minecraft'
    ),
    (
        'Nascence', 'https://youtu.be/oHesRe0uD9Q?si=rHgeWO2XUy_i0V3p', 'https://www.youtube.com/embed/oHesRe0uD9Q?autoplay=1&si=rHgeWO2XUy_i0V3p', 'Journey'
    ),
    (
        'Threshold', 'https://youtu.be/KTlScD1ixYs?si=oPNOu6rKGTmW5pat', 'https://www.youtube.com/embed/KTlScD1ixYs?autoplay=1&si=oPNOu6rKGTmW5pat', 'Journey'
    ),
    (
        'Apotheosis', 'https://youtu.be/ypNgvc6c6Cc?si=vrjETfkKFaj3CZIt', 'https://www.youtube.com/embed/ypNgvc6c6Cc?autoplay=1&si=vrjETfkKFaj3CZIt', 'Journey'
    ),
    (
        'Colony 9 (Night)', 'https://youtu.be/MLHmZ7FI1yA?si=8rBXD-FcVWYxwK_T', 'https://www.youtube.com/embed/MLHmZ7FI1yA?autoplay=1&si=JgfCXiMo7i0gOiMq', 'Xenoblade Chronicles'
    ),
    (
        'Gaur Plain', 'https://youtu.be/UDJtsfR51To?si=Vo6n3Pf_b8BQIPnD', 'https://www.youtube.com/embed/UDJtsfR51To?autoplay=1&si=Vo6n3Pf_b8BQIPnD', 'Xenoblade Chronicles'
    ),
    (
        'Main Theme', 'https://youtu.be/erKkWGfEW9U?si=SA2a9u40XoNthnVx', 'https://www.youtube.com/embed/erKkWGfEW9U?autoplay=1&si=SA2a9u40XoNthnVx', 'Xenoblade Chronicles'
    ),
    (
        'Main Theme', 'https://youtu.be/cGufy1PAeTU?si=EV-pqP-Ciyh_z8Vk', 'https://www.youtube.com/embed/cGufy1PAeTU?autoplay=1&si=EV-pqP-Ciyh_z8Vk', 'The Legend of Zelda'
    ),
    (
        'Title Theme', 'https://youtu.be/N22STVAxL5M?si=_72erA7RAGDJ_06h', 'https://www.youtube.com/embed/N22STVAxL5M?autoplay=1&si=_72erA7RAGDJ_06h', 'The Legend of Zelda: Ocarina of Time'
    ),
    (
        'No Escape', 'https://youtu.be/oksESAMg7WM?si=DEQirIjxf3U1nkGA', 'https://www.youtube.com/embed/oksESAMg7WM?autoplay=1&si=DEQirIjxf3U1nkGA', 'Hades'
    ),
    (
        'Lament of Orpheus', 'https://youtu.be/Oll7pr4JVTQ?si=8ReNaOl5v4uxarFy', 'https://www.youtube.com/embed/Oll7pr4JVTQ?autoplay=1&si=8ReNaOl5v4uxarFy', 'Hades'
    ),
    (
        'The Painful Way', 'https://youtu.be/vqKoFKVxTYM?si=_ZxY67YBCwBcDM6x', 'https://www.youtube.com/embed/vqKoFKVxTYM?autoplay=1&si=_ZxY67YBCwBcDM6x', 'Hades'
    ),
    (
        'In the Blood', 'https://youtu.be/ojx8dyes__8?si=raP2HpHZThmQm_z6', 'https://www.youtube.com/embed/ojx8dyes__8?autoplay=1&si=raP2HpHZThmQm_z6', 'Hades'
    ),
    (
        'Alex the Hacker', 'https://youtu.be/pdzmiN9Og5I?si=w-9lypDtijDZUtik', 'https://www.youtube.com/embed/pdzmiN9Og5I?autoplay=1&si=w-9lypDtijDZUtik', 'Road 96'
    ),
    (
        'Sonya''s Limo', 'https://youtu.be/7mNOFioW56E?si=_9uDXZMOqIwvqBx_', 'https://www.youtube.com/embed/7mNOFioW56E?autoplay=1&si=_9uDXZMOqIwvqBx_', 'Road 96'
    ),
    (
        'The Mountain Peak', 'https://youtu.be/SsGpeODhU9M?si=5PZdAKYCO0D4jRzQ', 'https://www.youtube.com/embed/SsGpeODhU9M?autoplay=1&si=5PZdAKYCO0D4jRzQ', 'Road 96'
    ),
    (
        'The Road', 'https://youtu.be/Dr8tcS-G5G4?si=eUWXc7kXo8KqsxE2', 'https://www.youtube.com/embed/Dr8tcS-G5G4?autoplay=1&si=eUWXc7kXo8KqsxE2', 'Road 96'
    ),
    (
        'On the Road', 'https://youtu.be/zRxsk1AS4ZA?si=aVGJ3MBLo7w-99nN', 'https://www.youtube.com/embed/zRxsk1AS4ZA?autoplay=1&si=aVGJ3MBLo7w-99nN', 'Road 96'
    ),
    (
        'Glint''s Legacy', 'https://youtu.be/mW7Ed9486Ik?si=WZI8LNJIA-3vqybA', 'https://www.youtube.com/embed/mW7Ed9486Ik?autoplay=1&si=WZI8LNJIA-3vqybA', 'Guild Wars 2'
    ),
    (
        'Path of Fire', 'https://youtu.be/BoIoZcNCqdk?si=bqZ0AJNhh2mGv2iS', 'https://www.youtube.com/embed/BoIoZcNCqdk?autoplay=1&si=bqZ0AJNhh2mGv2iS', 'Guild Wars 2'
    ),
    (
        'End of Dragons', 'https://youtu.be/6Qs5VHe7sOA?si=7LK3ipy2JvQIhQN2', 'https://www.youtube.com/embed/6Qs5VHe7sOA?autoplay=1&si=7LK3ipy2JvQIhQN2', 'Guild Wars 2'
    ),
    (
        'Main Theme', 'https://youtu.be/DN-Dcwq4i2g?si=FayM3unUUbtS9GqS', 'https://www.youtube.com/embed/DN-Dcwq4i2g?autoplay=1&si=FayM3unUUbtS9GqS', 'Divinity Original Sin 2'
    ),
    (
        'Last Voyage', 'https://youtu.be/jMwQcl7uIRc?si=3sSTOhUQl_wzAKVZ', 'https://www.youtube.com/embed/jMwQcl7uIRc?autoplay=1&si=3sSTOhUQl_wzAKVZ', 'Spiritfarer'
    ),
    (
        'Stella''s Departure', 'https://youtu.be/hicJlqZZaYU?si=mopNhz81evOHGnk3', 'https://www.youtube.com/embed/hicJlqZZaYU?autoplay=1&si=mopNhz81evOHGnk3', 'Spiritfarer'
    ),
    (
        'Tale', 'https://youtu.be/7Ug0NYVMSwM?si=pUoksofO2HtLJBle', 'https://www.youtube.com/embed/7Ug0NYVMSwM?autoplay=1&si=pUoksofO2HtLJBle', 'Eastward'
    ),
    (
        'Combat en Amakna', 'https://youtu.be/6pb2ayNeY7g?si=9EAOrwbgxAfhxN97', 'https://www.youtube.com/embed/6pb2ayNeY7g?autoplay=1&si=9EAOrwbgxAfhxN97', 'Dofus'
    ),
    (
        'Theme Song', 'https://youtu.be/NTa6Xbzfq1U?si=eFpqpD1Ojpi8ZHsW', 'https://www.youtube.com/embed/NTa6Xbzfq1U?autoplay=1&si=eFpqpD1Ojpi8ZHsW', 'Super Mario Bros.'
    ),
    (
        'Pallet Town Theme', 'https://youtu.be/7lokJiY5Xgo?si=nnU0Jc6D787caoCx', 'https://www.youtube.com/embed/7lokJiY5Xgo?autoplay=1&si=nnU0Jc6D787caoCx', 'Pokemon Rouge/Bleu'
    ),
    (
        'Battle! (Trainer Battle)', 'https://youtu.be/as5EhE9f14o?si=vrHMJQtCeRJngQpM', 'https://www.youtube.com/embed/as5EhE9f14o?autoplay=1&si=vrHMJQtCeRJngQpM', 'Pokemon Rouge/Bleu'
    ),
    (
        'Battle! (Wild Pokémon)', 'https://youtu.be/HYK9U-yxW1U?si=2zNhfz5oqwxCABLX', 'https://www.youtube.com/embed/HYK9U-yxW1U?autoplay=1&si=2zNhfz5oqwxCABLX', 'Pokemon Rouge/Bleu'
    ),
    (
        'Pokémon Center', 'https://youtu.be/n6sgyINH57k?si=E0gvM2lcP6oMzbXf', 'https://www.youtube.com/embed/n6sgyINH57k?autoplay=1&si=E0gvM2lcP6oMzbXf', 'Pokemon Rouge/Bleu'
    ),
    (
        'Title Theme', 'https://youtu.be/XgTsAZop5R4?si=LZ1tua7N1Y72FPEw', 'https://www.youtube.com/embed/XgTsAZop5R4?autoplay=1&si=LZ1tua7N1Y72FPEw', 'Mario Kart'
    ),
    (
        'Timber Hearth', 'https://youtu.be/SPa8bPqQfmo?si=xDsLuiXx92RRqfla', 'https://www.youtube.com/embed/SPa8bPqQfmo?si=xDsLuiXx92RRqfla&autoplay=1', 'Outer Wilds'
    ),
    (
        'Outer Wilds', 'https://youtu.be/Xpkc-NU1KA0?si=qUmy12iUNne860-s', 'https://www.youtube.com/embed/Xpkc-NU1KA0?si=qUmy12iUNne860-s&autoplay=1', 'Outer Wilds'
    ),
    (
        'One-Winged Angel', 'https://youtu.be/nNms5rOaGlk?si=_QN3jld2hETN1DKM', 'https://www.youtube.com/embed/nNms5rOaGlk?si=_QN3jld2hETN1DKM&autoplay=1', 'Final Fantasy VII'
    ),
    (
        'Cosmo Canyon', 'https://youtu.be/pqO5h3-HFW8?si=l2G2XwQNEA8Nf07C', 'https://www.youtube.com/embed/pqO5h3-HFW8?si=l2G2XwQNEA8Nf07C&autoplay=1', 'Final Fantasy VII'
    ),
    (
        'Victory Fanfare', 'https://youtu.be/rgUksX6eM0Y?si=-IhJr-eUI_e3iGWy', 'https://www.youtube.com/embed/rgUksX6eM0Y?si=-IhJr-eUI_e3iGWy&autoplay=1', 'Final Fantasy VII'
    ),
    (
        'Chocobo Theme', 'https://youtu.be/rkX6y0zNC_U?si=KwTDEVVCo5xJcBSN', 'https://www.youtube.com/embed/rkX6y0zNC_U?si=KwTDEVVCo5xJcBSN&autoplay=1', 'Final Fantasy VII'
    ),
    (
        'Gerudo Valley', 'https://youtu.be/0hEYvdMoF2g?si=zRstJP638AzJrW0U', 'https://www.youtube.com/embed/0hEYvdMoF2g?si=zRstJP638AzJrW0U&autoplay=1', 'The Legend of Zelda: Ocarina of Time'
    ),
    (
        'Lost Woods', 'https://youtu.be/Ljqe4Nj7nBA?si=EflLEtXGXzpj7tF4', 'https://www.youtube.com/embed/Ljqe4Nj7nBA?si=EflLEtXGXzpj7tF4&autoplay=1', 'The Legend of Zelda: Ocarina of Time'
    ),
    (
        'Kokiri Forest', 'https://youtu.be/aQ6Fq-LfDZQ?si=NviVGIiKeNKpUltD', 'https://www.youtube.com/embed/aQ6Fq-LfDZQ?si=NviVGIiKeNKpUltD&autoplay=1', 'The Legend of Zelda: Ocarina of Time'
    ),
    (
        'Shop', 'https://youtu.be/o5xykMvJejk?si=XURVWuu0enPW3EWJ', 'https://www.youtube.com/embed/o5xykMvJejk?si=XURVWuu0enPW3EWJ&autoplay=1', 'The Legend of Zelda: Ocarina of Time'
    ),
    (
        'Theme song', 'https://youtu.be/3CS93CdMv_E?si=3od5bwctwnB91ybT', 'https://www.youtube.com/embed/3CS93CdMv_E?si=3od5bwctwnB91ybT&autoplay=1', 'Kirby''s Return to Dream Land'
    ),
    (
        'DK Island Swing', 'https://youtu.be/HG8YrDF6cDk?si=oeY4feZ1i6Qy6aY9', 'https://www.youtube.com/embed/HG8YrDF6cDk?si=uvnhEq2EEiAeZSt-&amp;start=25&autoplay=1', 'Donkey Kong Country'
    ),
    (
        'Athletic', 'https://youtu.be/oKJ2EZnnZRE?si=hfYJp-NmB_SflK3k', 'https://www.youtube.com/embed/oKJ2EZnnZRE?si=hfYJp-NmB_SflK3k&autoplay=1', 'Yoshi''s Island'
    ),
    (
        'Flower Garden', 'https://youtu.be/DTpksvCC-hg?si=KYwDvcRLz2qF3KCA', 'https://www.youtube.com/embed/DTpksvCC-hg?si=KYwDvcRLz2qF3KCA&autoplay=1', 'Yoshi''s Island'
    ),
    (
        'Battle! (Gym Leader Battle)', 'https://youtu.be/1XN9bXOGcR8?si=VZSUbN6syKgCAWDh', 'https://www.youtube.com/embed/1XN9bXOGcR8?si=VZSUbN6syKgCAWDh&autoplay=1', 'Pokemon Rouge/Bleu'
    ),
    (
        'Lavender Town Theme', 'https://youtu.be/MWgDrjI80wE?si=D6Ej-Q4fwvF1RUCs', 'https://www.youtube.com/embed/MWgDrjI80wE?si=D6Ej-Q4fwvF1RUCs&autoplay=1', 'Pokemon Rouge/Bleu'
    ),
    (
        'Main Theme', 'https://youtu.be/uNbDEs8wrW4?si=OpKJkzhHRb3Lcgza', 'https://www.youtube.com/embed/uNbDEs8wrW4?si=OpKJkzhHRb3Lcgza&autoplay=1', 'Wii Fit'
    ),
    (
        'Advanced Step', 'https://youtu.be/4_Ir6zA10w0?si=UmrBMPem8U6jLNtq', 'https://www.youtube.com/embed/4_Ir6zA10w0?si=UmrBMPem8U6jLNtq&autoplay=1', 'Wii Fit'
    ),
    (
        'Engage the Enemy', 'https://youtu.be/xi0M9SIaLb4?si=eDRxSe9ZLSVq1Tyk', 'https://www.youtube.com/embed/xi0M9SIaLb4?si=eDRxSe9ZLSVq1Tyk&autoplay=1', 'Xenoblade Chronicles'
    ),
    (
        'You Will Know Our Names', 'https://youtu.be/g7yNyhLOIa4?si=HubvvLGLZYnhP61n', 'https://www.youtube.com/embed/g7yNyhLOIa4?si=HubvvLGLZYnhP61n&autoplay=1', 'Xenoblade Chronicles'
    ),
    (
        'Green Hill Zone', 'https://youtu.be/G-i8HYi1QH0?si=yZLYxWXLo8gaGrFI', 'https://www.youtube.com/embed/G-i8HYi1QH0?si=yZLYxWXLo8gaGrFI&autoplay=1', 'Sonic The Hedgehog'
    ),
    (
        'Main Theme', 'https://youtu.be/PNE0iCo6W4I?si=PqDtNTfy3f94UKWO', 'https://www.youtube.com/embed/PNE0iCo6W4I?si=PqDtNTfy3f94UKWO&autoplay=1', 'PacMan'
    ),
    (
        'Main Theme', 'https://youtu.be/NmCCQxVBfyM?si=dBzIBhf0lVEm6fjA', 'https://www.youtube.com/embed/NmCCQxVBfyM?si=dBzIBhf0lVEm6fjA&autoplay=1', 'Tetris'
    ),
    (
        'Bloody Tears (Day Theme)', 'https://youtu.be/e2oZtvjg5oA?si=PWfXzhXgTZoDYgMT', 'https://www.youtube.com/embed/e2oZtvjg5oA?si=PWfXzhXgTZoDYgMT&autoplay=1', 'Castlevania'
    ),
    (
        'Deja Vu (Vampire Killer)', 'https://youtu.be/1-RdjNFCYs8?si=EFvywLqlwXIzemqh', 'https://www.youtube.com/embed/1-RdjNFCYs8?si=EFvywLqlwXIzemqh&autoplay=1', 'Castlevania'
    ),
    (
        'Regal Ancestor Spirit', 'https://youtu.be/TNr-byxAyHg?si=kD8JNP00SpuoHxY_', 'https://www.youtube.com/embed/TNr-byxAyHg?si=kD8JNP00SpuoHxY_&autoplay=1', 'Elden Ring'
    ),
    (
        'Rainbow Road', 'https://youtu.be/Y0kWmQUyCqk?si=RBrqF-Jyc7ER26AD', 'https://www.youtube.com/embed/Y0kWmQUyCqk?si=RBrqF-Jyc7ER26AD&autoplay=1', 'Mario Kart'
    ),
    (
        'Rip & Tear', 'https://youtu.be/5Nz3HXwEG4M?si=JmapMhRp1fmJ3Rbk', 'https://www.youtube.com/embed/5Nz3HXwEG4M?si=JmapMhRp1fmJ3Rbk&autoplay=1', 'DOOM'
    ),
    (
        'BFG Division', 'https://youtu.be/o6y6chb0Qq8?si=28cS4aqmhcbjI91R', 'https://www.youtube.com/embed/o6y6chb0Qq8?si=S-J-YTIW2dZVtywV&amp;start=6&autoplay=1', 'DOOM'
    ),
    (
        'OVERTURE XI (Main Theme)', 'https://youtu.be/waH3uNlwMo4?si=1zHI-_cqMu6V8Pj9', 'https://www.youtube.com/embed/waH3uNlwMo4?si=1zHI-_cqMu6V8Pj9&autoplay=1', 'Dragon Quest'
    ),
    (
        'Dragon Roost Island', 'https://youtu.be/QtcgZGp3FGs?si=gmDx5O1mWv8lV7Bi', 'https://www.youtube.com/embed/QtcgZGp3FGs?si=dKO30_zMguwuvIk5&autoplay=1', 'The Legend of Zelda: The Wind Waker'
    ),
    (
        'Still Alive', 'https://youtu.be/Y6ljFaKRTrI?si=NrpC2BJCBeSfPZXF', 'https://www.youtube.com/embed/Y6ljFaKRTrI?si=hKF1hgXt0bQjyvuT&amp;start=7&autoplay=1', 'Portal'
    ),
    (
        'Main Theme', 'https://youtu.be/0jXTBAGv9ZQ?si=lBgNEYPrbugWtn42', 'https://www.youtube.com/embed/0jXTBAGv9ZQ?si=lBgNEYPrbugWtn42&autoplay=1', 'Halo'
    ),
    (
        'City of Tears', 'https://youtu.be/MJDn70jh1V0?si=lA5D6CcLhmud6ugW', 'https://www.youtube.com/embed/MJDn70jh1V0?si=-gFKoTyry2f5u7OH&autoplay=1', 'Hollow Knight'
    ),
    (
        'Dearly beloved', 'https://youtu.be/Jk4P10nsq4c?si=jpeVu0-cVbuAXNsS', 'https://www.youtube.com/embed/Jk4P10nsq4c?si=jpeVu0-cVbuAXNsS&autoplay=1', 'Kingdom Hearts'
    ),
    (
        'The Other Promise', 'https://youtu.be/s9XljBWGrRQ?si=ra_xcSE23S5_yL3E', 'https://www.youtube.com/embed/s9XljBWGrRQ?si=ra_xcSE23S5_yL3E&autoplay=1', 'Kingdom Hearts'
    ),
    (
        'Main Theme', 'https://youtu.be/SIXqoUb4S24?si=Tx2tSLz1hDeIW-MG', 'https://www.youtube.com/embed/SIXqoUb4S24?si=4Lz1U9ozEdJZ-Qwr&autoplay=1', 'Rayman'
    ),
    (
        'Intrument of Surrender', 'https://youtu.be/4f0m3hTW5-E?si=FiYS-8SlIPYOhYLO', 'https://www.youtube.com/embed/4f0m3hTW5-E?si=FiYS-8SlIPYOhYLO&autoplay=1', 'Disco Elysium'
    ),
    (
        'To Zanarkand', 'https://youtu.be/4f0m3hTW5-E?si=FiYS-8SlIPYOhYLO', 'https://www.youtube.com/embed/6fp81GzKarQ?si=O7pmdWfNdofnnRgb&autoplay=1', 'Final Fantasy X'
    ),
    (
        'Main Theme', 'https://youtu.be/TtrbLKbsCIU?si=LPgMXrqmLRWcQN_M', 'https://www.youtube.com/embed/TtrbLKbsCIU?si=LPgMXrqmLRWcQN_M&autoplay=1', 'Nintendogs'
    ),
    (
        'Theme Song', 'https://youtu.be/34B_QDoZy64?si=Uiz-9k-5K5kZvomR', 'https://www.youtube.com/embed/34B_QDoZy64?si=Uiz-9k-5K5kZvomR&autoplay=1', 'The Sims 3'
    ),
    (
        'Les Plaines de Cania', 'https://youtu.be/Rhip-obqAVk?si=K9q44IZI9FTxZ7Od', 'https://www.youtube.com/embed/Rhip-obqAVk?si=q3vDgpWrnBBt6lrC&amp;start=20&autoplay=1', 'Dofus'
    ),
    (
        'Le Village de Pandala', 'https://youtu.be/klt9HlZsXj4?si=1kSb1WPwJP2uijrz', 'https://www.youtube.com/embed/klt9HlZsXj4?si=1kSb1WPwJP2uijrz&autoplay=1', 'Dofus'
    ),
    (
        'Clock Town Day 1', 'https://youtu.be/kBhteB4ETc4?si=z03dtEt7ZIOgK2Cw', 'https://www.youtube.com/embed/kBhteB4ETc4?si=z03dtEt7ZIOgK2Cw&autoplay=1', 'The Legend of Zelda: Majora''s Mask'
    ),
    (
        'Scattered and Lost', 'https://youtu.be/0etenwnI1wo?si=PHuc6H9GZvQBDM84', 'https://www.youtube.com/embed/0etenwnI1wo?si=PHuc6H9GZvQBDM84&autoplay=1', 'Celeste'
    ),
    (
        'Reach for the Summit', 'https://youtu.be/iDVM9KED46Q?si=2EqYFq7n161msTih', 'https://www.youtube.com/embed/iDVM9KED46Q?si=IWK44Vy8KB-67QuP&autoplay=1', 'Celeste'
    ),
    (
        'Puzzle', 'https://youtu.be/RBi_kg6l9AE?si=UJ7OmIwWWg2RHHIm', 'https://www.youtube.com/embed/RBi_kg6l9AE?si=UJ7OmIwWWg2RHHIm&autoplay=1', 'Professeur Layton et l''étrange village'
    ),
    (
        'Underground Theme', 'https://youtu.be/UOwyFPgjPQ4?si=JlY5MB_lSSAQitHe', 'https://www.youtube.com/embed/UOwyFPgjPQ4?si=JlY5MB_lSSAQitHe&autoplay=1', 'Super Mario Bros.'
    ),
    (
        'Star Theme', 'https://youtu.be/TLb33K8UO30?si=uIbMpNiyr1bzGwTa', 'https://www.youtube.com/embed/TLb33K8UO30?si=uIbMpNiyr1bzGwTa&autoplay=1', 'Super Mario Bros.'
    ),
    (
        'Adventure', 'https://youtu.be/LeQGo6L-kYo?si=2Qg7LyatCqkZV0Vp', 'https://www.youtube.com/embed/LeQGo6L-kYo?si=2Qg7LyatCqkZV0Vp&autoplay=1', 'Dragon Quest'
    ),
    (
        'Science is Fun', 'https://youtu.be/oAg4yjEmerU?si=ee8U738sd9haUWLX', 'https://www.youtube.com/embed/oAg4yjEmerU?si=ee8U738sd9haUWLX&autoplay=1', 'Portal 2'
    ),
    (
        'Flood Theme', 'https://youtu.be/RyUiu_2jjP8?si=WV_mgyK5sOv_qBYJ', 'https://www.youtube.com/embed/RyUiu_2jjP8?si=WV_mgyK5sOv_qBYJ&autoplay=1', 'Halo'
    ),
    (
        'First Steps', 'https://youtu.be/oVlSD0di-gQ?si=nmMqv2ljaPl-vcY9', 'https://www.youtube.com/embed/oVlSD0di-gQ?si=nmMqv2ljaPl-vcY9&autoplay=1', 'Rayman'
    ),
    (
        'Secunda', 'https://youtu.be/iqkQRgGdAPo?si=WfEP-sr-ruwcO-5D', 'https://www.youtube.com/embed/iqkQRgGdAPo?si=WfEP-sr-ruwcO-5D&autoplay=1', 'The Elder Scrolls V : Skyrim'
    ),
    (
        'Ezio''s Family', 'https://youtu.be/FSVHx23ByhM?si=BjkRTLWPI_hnvqQt', 'https://www.youtube.com/embed/FSVHx23ByhM?si=BjkRTLWPI_hnvqQt&autoplay=1', 'Assassin''s Creed 2'
    ),
    (
        'Theme Song', 'https://youtu.be/pfA5UqEU_80?si=2SYNE8D118N8Dc85', 'https://www.youtube.com/embed/pfA5UqEU_80?si=2SYNE8D118N8Dc85&autoplay=1', 'The Last of Us'
    ),
    (
        'Gwyn, Lord of Cinder', 'https://youtu.be/77rv-ff75Hk?si=9P4FJF8VX56SX0qE', 'https://www.youtube.com/embed/77rv-ff75Hk?si=9P4FJF8VX56SX0qE&autoplay=1', 'Dark Souls'
    ),
    (
        'Far Horizons', 'https://youtu.be/Mq3dlf03GVU?si=1eKB8dJ2axXGt8p_', 'https://www.youtube.com/embed/Mq3dlf03GVU?si=1eKB8dJ2axXGt8p_&autoplay=1', 'The Elder Scrolls V : Skyrim'
    ),
    (
        'Song of Storms', 'https://youtu.be/UtgHZaq0EGs?si=SSYC31fwOWC6TpHO', 'https://www.youtube.com/embed/UtgHZaq0EGs?si=SSYC31fwOWC6TpHO&autoplay=1', 'The Legend of Zelda: Ocarina of Time'
    ),
    (
        'At Doom''s Gate', 'https://youtu.be/HsLOxbLZMy8?si=uJdri9p__FSm79C8', 'https://www.youtube.com/embed/HsLOxbLZMy8?si=uJdri9p__FSm79C8&autoplay=1', 'DOOM'
    ),
    (
        'Song of Healing', 'https://youtu.be/XDX4ZwUeOok?si=_TF9ROReElB2mTRm', 'https://www.youtube.com/embed/XDX4ZwUeOok?si=_TF9ROReElB2mTRm&autoplay=1', 'The Legend of Zelda: Majora''s Mask'
    ),
    (
        'Bowser''s Theme', 'https://youtu.be/bq_jS6o3OoY?si=ioqMP9oyzKo3vP7e', 'https://www.youtube.com/embed/bq_jS6o3OoY?si=ioqMP9oyzKo3vP7e&autoplay=1', 'Super Mario 64'
    ),
    (
        'Techno Syndrome', 'https://youtu.be/Sr1bLLvsbh0?si=-1PaFxUkDhaYs2-L', 'https://www.youtube.com/embed/Sr1bLLvsbh0?si=-1PaFxUkDhaYs2-L&autoplay=1', 'Mortal Kombat'
    ),
    (
        'Guile Theme', 'https://youtu.be/FEdbR0jnfvQ?si=4Cy6AYxV7tk_wGae', 'https://www.youtube.com/embed/FEdbR0jnfvQ?si=4Cy6AYxV7tk_wGae&autoplay=1', 'Street Fighter'
    ),
    (
        'Black Ops Theme', 'https://youtu.be/T5ASJvTgpJo?si=j7zhTuxsYv9YwZrj', 'https://www.youtube.com/embed/T5ASJvTgpJo?si=xNjI91CFjYiNAA78&amp;start=3&autoplay=1', 'Call of Duty Black Ops'
    ),
    (
        'Theme Song', 'https://youtu.be/W4VTq0sa9yg?si=lCJDyDFeMI-zCJm5', 'https://www.youtube.com/embed/W4VTq0sa9yg?si=lCJDyDFeMI-zCJm5&autoplay=1', 'Grand Theft Auto San Andreas'
    ),
    (
        'Escape From The City', 'https://youtu.be/5WcyVvWZJU4?si=D6uJVH86GMhxRD1I', 'https://www.youtube.com/embed/5WcyVvWZJU4?si=D6uJVH86GMhxRD1I&autoplay=1', 'Sonic Adventure 2'
    ),
    (
        'Introduction', 'https://youtu.be/edpbsFvypK0?si=b6gya_qo0EC5byrO', 'https://www.youtube.com/embed/edpbsFvypK0?si=b6gya_qo0EC5byrO&autoplay=1', 'Cuphead'
    ),
    (
        'Don''t Deal With The Devil', 'https://youtu.be/D6KXf-kXKIA?si=SucG3eXEc1vzH8jp', 'https://www.youtube.com/embed/D6KXf-kXKIA?si=SucG3eXEc1vzH8jp&autoplay=1', 'Cuphead'
    ),
    (
        'Dummy!', 'https://youtu.be/N3epEVMNJdY?si=6Xe8x83mSTF2IUP7', 'https://www.youtube.com/embed/N3epEVMNJdY?si=6Xe8x83mSTF2IUP7&autoplay=1', 'UNDERTALE'
    ),
    (
        'Bonetrousle', 'https://youtu.be/FezNgPThD3M?si=MUnz3b9ElyRzZ368', 'https://www.youtube.com/embed/FezNgPThD3M?si=MUnz3b9ElyRzZ368&autoplay=1', 'UNDERTALE'
    ),
    (
        'Jump Up, Super Star!', 'https://youtu.be/e9r5hx47kxM?si=Gc562OFX3DqIQyMd', 'https://www.youtube.com/embed/e9r5hx47kxM?si=Gc562OFX3DqIQyMd&autoplay=1', 'Super Mario Odyssey'
    ),
    (
        'Main Theme', 'https://youtu.be/4i8qAZOu5-g?si=pDfa_GP7EGLl7LeX', 'https://www.youtube.com/embed/4i8qAZOu5-g?si=pDfa_GP7EGLl7LeX&autoplay=1', 'Crash Bandicoot'
    ),
    (
        'Battle Theme', 'https://youtu.be/lYO5k3ZrPxE?si=kOBq7CV6_M0PZ00H', 'https://www.youtube.com/embed/lYO5k3ZrPxE?si=kOBq7CV6_M0PZ00H&autoplay=1', 'Dragon Quest'
    ),
    (
        'Sword of Destiny', 'https://youtu.be/viM0-3PXef0?si=0pZ5VjtzI7pNNkMC', 'https://www.youtube.com/embed/viM0-3PXef0?si=0pZ5VjtzI7pNNkMC&autoplay=1', 'The Witcher 3'
    ),
    (
        'The Trail', 'https://youtu.be/i1qjKo6Ts60?si=seDAP4riIFYnRi0Y', 'https://www.youtube.com/embed/i1qjKo6Ts60?si=seDAP4riIFYnRi0Y&autoplay=1', 'The Witcher 3'
    ),
    (
        'Theme Song', 'https://youtu.be/DehK_Y0TUbE?si=8x60BwwnvwfQPBsf', 'https://www.youtube.com/embed/DehK_Y0TUbE?si=8x60BwwnvwfQPBsf&autoplay=1', 'Angry Birds'
    ),
    (
        'Main Theme', 'https://youtu.be/7hT04AB1JU4?si=9wMrpohJxjGAjdkc', 'https://www.youtube.com/embed/7hT04AB1JU4?si=9wMrpohJxjGAjdkc&autoplay=1', 'Super Mario 64'
    ),
    (
        'Inside the Castle Walls', 'https://youtu.be/ZkFpUQc3Y2o?si=Ge26CHsnpy5MsfM9', 'https://www.youtube.com/embed/ZkFpUQc3Y2o?si=Ge26CHsnpy5MsfM9&autoplay=1', 'Super Mario 64'
    ),
    (
        'Main Menu', 'https://youtu.be/4w3VqzwJ1j4?si=NPldBo9lAf6a3uy-', 'https://www.youtube.com/embed/4w3VqzwJ1j4?si=NPldBo9lAf6a3uy-&autoplay=1', 'Plants vs Zombies'
    ),
    (
        'Stardew Valley Overture', 'https://youtu.be/FQSHcl6TJb4?si=xAtFtPYJ46aayxqg', 'https://www.youtube.com/embed/FQSHcl6TJb4?si=xAtFtPYJ46aayxqg&autoplay=1', 'Stardew Valley'
    ),
    (
        'Theme Song', 'https://youtu.be/OBQE_TNI7zw?si=jSZXhGxKjn11Y-P5', 'https://www.youtube.com/embed/OBQE_TNI7zw?si=jSZXhGxKjn11Y-P5&autoplay=1', 'Papers, Please'
    ),
    (
        'Six''s Theme Part 2', 'https://youtu.be/OrgtPo51ynE?si=JMZ8KFchqh2NCZE-', 'https://www.youtube.com/embed/OrgtPo51ynE?si=JMZ8KFchqh2NCZE-&autoplay=1', 'Little Nightmares'
    ),
    (
        'Hyper', 'https://youtu.be/CHENRaquRHo?si=6LexhRkBmwt1HkQ4', 'https://www.youtube.com/embed/CHENRaquRHo?si=6LexhRkBmwt1HkQ4&autoplay=1', 'Cyberpunk 2077'
    ),
    (
        'Loading', 'https://youtu.be/mx7fQOnt82E?si=d37PxdsCSuyoslXL', 'https://www.youtube.com/embed/mx7fQOnt82E?si=d37PxdsCSuyoslXL&autoplay=1', 'Valorant'
    ),
    (
        'Main Theme', 'https://youtu.be/5-BIqqSe1nU?si=F5c0ouihXvm1b0rl', 'https://www.youtube.com/embed/5-BIqqSe1nU?si=F5c0ouihXvm1b0rl&autoplay=1', 'Red Dead Redemption'
    ),
    (
        'American Venom', 'https://youtu.be/-MK5ChLJTAk?si=pxJKfYngfOT_J0ts', 'https://www.youtube.com/embed/-MK5ChLJTAk?si=pxJKfYngfOT_J0ts&autoplay=1', 'Red Dead Redemption 2'
    ),
    (
        'That''s the way it is', 'https://youtu.be/YdW5-uJqCVY?si=6cCyv8CcI3nKofFc&t=11', 'https://www.youtube.com/embed/YdW5-uJqCVY?si=6cCyv8CcI3nKofFc&amp;start=11&autoplay=1', 'Red Dead Redemption 2'
    ),
    (
        'House building theme', 'https://youtu.be/j8068ZrwicQ?si=w2031OKxSDIvCoyR', 'https://www.youtube.com/embed/j8068ZrwicQ?si=w2031OKxSDIvCoyR&autoplay=1', 'Red Dead Redemption 2'
    ),
    (
        'Brinstar Theme', 'https://youtu.be/WVTzg2kvNaQ?si=-06lPwZuxxJXCu6l', 'https://www.youtube.com/embed/WVTzg2kvNaQ?si=-06lPwZuxxJXCu6l&autoplay=1', 'Metroid'
    ),
    (
        'The Moon Theme', 'https://youtu.be/KF32DRg9opA?si=w2YHdpzT4dpp35HU', 'https://www.youtube.com/embed/KF32DRg9opA?si=w2YHdpzT4dpp35HU&autoplay=1', 'Duck Tales'
    ),
    (
        'Great Fairy''s Fountain', 'https://youtu.be/id0kbyKCG8c?si=VWiWj5dLKtOwPnO3', 'https://www.youtube.com/embed/id0kbyKCG8c?si=JmH4VsODsktcw0e_&autoplay=1', 'The Legend of Zelda: Ocarina of Time'
    ),
    (
        'Slide Theme', 'https://youtu.be/l7I8dYKeke8?si=uSoNbk1n6F08GFSd', 'https://www.youtube.com/embed/l7I8dYKeke8?si=uSoNbk1n6F08GFSd&autoplay=1', 'Super Mario 64'
    ),
    (
        'Delfino Plaza', 'https://youtu.be/KYdRWC6MCgM?si=AFXbLjSy-qs89gbr', 'https://www.youtube.com/embed/KYdRWC6MCgM?si=AFXbLjSy-qs89gbr&autoplay=1', 'Super Mario Sunshine'
    ),
    (
        'Main Theme', 'https://youtu.be/lI_C1Bjdqn4?si=x1K2ryHT0k4xXFjh', 'https://www.youtube.com/embed/lI_C1Bjdqn4?si=x1K2ryHT0k4xXFjh&autoplay=1', 'Animal Crossing'
    ),
    (
        'Title', 'https://youtu.be/2qvAxPqy2wA?si=FSsS3y5Py-sU5VGe', 'https://www.youtube.com/embed/2qvAxPqy2wA?si=FSsS3y5Py-sU5VGe&autoplay=1', 'Wii Sports'
    ),
    (
        'Main Theme', 'https://youtu.be/PDM2qukzKwg?si=JbfDC56wPZ9zAuLu', 'https://www.youtube.com/embed/PDM2qukzKwg?si=JbfDC56wPZ9zAuLu&autoplay=1', 'Team Fortress 2'
    ),
    (
        'Coconut Mall', 'https://youtu.be/cscuCIzItZQ?si=1vf3Uam8XBJoW7l-', 'https://www.youtube.com/embed/cscuCIzItZQ?si=1vf3Uam8XBJoW7l-&autoplay=1', 'Mario Kart'
    ),
    (
        'Overworld Day', 'https://youtu.be/Zmd43wV2Ko4?si=fLTwqdUlYFY2H9Q7', 'https://www.youtube.com/embed/Zmd43wV2Ko4?si=fLTwqdUlYFY2H9Q7&autoplay=1', 'Terraria'
    ),
    (
        'Main Menu Music Theme', 'https://youtu.be/Rvi6c8toWJM?si=x18XtrggOD7BR2uh', 'https://www.youtube.com/embed/Rvi6c8toWJM?si=x18XtrggOD7BR2uh&autoplay=1', 'Counter-Strike: Global Offensive'
    ),
    (
        'Main Title', 'https://youtu.be/WXxy3Y8daks?si=ywNW2KdPykyXmDM5', 'https://www.youtube.com/embed/WXxy3Y8daks?si=ywNW2KdPykyXmDM5&autoplay=1', 'Hearthstone'
    ),
    (
        'Menu', 'https://youtu.be/o0eCgMjA8vo?si=tvx6IU7FFXlaCguh', 'https://www.youtube.com/embed/o0eCgMjA8vo?si=tvx6IU7FFXlaCguh&autoplay=1', 'Super Smash Bros. Ultimate'
    ),
    (
        'Pt.1', 'https://youtu.be/kqZNj-kUq1k?si=Xkp2Fpa8QOqrcM5w', 'https://www.youtube.com/embed/kqZNj-kUq1k?si=Xkp2Fpa8QOqrcM5w&autoplay=1', 'GRIS'
    ),
    (
        'Promise', 'https://youtu.be/6qalGezr76o?si=rN7iG-dnr09u5RhU', 'https://www.youtube.com/embed/6qalGezr76o?si=rN7iG-dnr09u5RhU&autoplay=1', 'Silent Hill'
    ),
    (
        'Theme of Laura', 'https://youtu.be/td3P1-cfZ4E?si=1Qr0dH6lAtZz91K8', 'https://www.youtube.com/embed/td3P1-cfZ4E?si=1Qr0dH6lAtZz91K8&autoplay=1', 'Silent Hill'
    ),
    (
        'Main Theme', 'https://youtu.be/-1LDIPBWjtU?si=J0tx8qbNoHJYDnKl', 'https://www.youtube.com/embed/-1LDIPBWjtU?si=J0tx8qbNoHJYDnKl&autoplay=1', 'Chrono Trigger'
    ),
    (
        'Prologue', 'https://youtu.be/Pdi1DSqBZ6Q?si=wd81IsSXUJccyZ_q', 'https://www.youtube.com/embed/Pdi1DSqBZ6Q?si=wd81IsSXUJccyZ_q&autoplay=1', 'Shadow of the Colossus'
    ),
    (
        'Strike the Earth! Plains of Passage', 'https://youtu.be/wqAYMZSOQao?si=gdFDdhqz8s7_u4vg', 'https://www.youtube.com/embed/wqAYMZSOQao?si=gdFDdhqz8s7_u4vg&autoplay=1', 'Shovel Knight'
    ),
    (
        'Otherworld', 'https://youtu.be/BKZs90_fkt4?si=2M_3nkaFmz9W02kh', 'https://www.youtube.com/embed/BKZs90_fkt4?si=2M_3nkaFmz9W02kh&autoplay=1', 'Final Fantasy X'
    ),
    (
        'Vamo Alla Flamenco', 'https://youtu.be/JfSmQaDZwrE?si=GlBzhYimhpHPEYLH', 'https://www.youtube.com/embed/JfSmQaDZwrE?si=GlBzhYimhpHPEYLH&autoplay=1', 'Final Fantasy IX'
    ),
    (
        'The Place I''ll Return to Someday', 'https://youtu.be/1WcN35Y_hpw?si=1Dco7OPFdzRFugIh', 'https://www.youtube.com/embed/1WcN35Y_hpw?si=1Dco7OPFdzRFugIh&autoplay=1', 'Final Fantasy IX'
    ),
    (
        'Main Theme', 'https://youtu.be/buOhUGJ9Pvc?si=YoSblq0LoC4JkRsW', 'https://www.youtube.com/embed/buOhUGJ9Pvc?si=YoSblq0LoC4JkRsW&autoplay=1', 'Banjo Kazooie'
    ),
    (
        'Spec Ops Menu', 'https://youtu.be/5Gy3kuhnJNE?si=3ZQ-JYPKKc7hi2Hk', 'https://www.youtube.com/embed/5Gy3kuhnJNE?si=3ZQ-JYPKKc7hi2Hk&autoplay=1', 'Call of Duty: Modern Warfare 2'
    ),
    (
        'Title Theme', 'https://youtu.be/M-U3sVX2G3w?si=tf-hvqKTa0W08Dak', 'https://www.youtube.com/embed/M-U3sVX2G3w?si=tf-hvqKTa0W08Dak&autoplay=1', 'Metroid'
    ),
    (
        'James Bond Theme', 'https://youtu.be/p1BvOMykITY?si=vEtw5cztS346spua', 'https://www.youtube.com/embed/p1BvOMykITY?si=iqRByuWFSeWKFTyS&autoplay=1', 'GoldenEye 007'
    ),
    (
        'Alert Theme', 'https://youtu.be/CEvzFcqKbXw?si=8k1EBL-W-_zAE8rf', 'https://www.youtube.com/embed/CEvzFcqKbXw?si=8k1EBL-W-_zAE8rf&autoplay=1', 'Metal Gear Solid'
    ),
    (
        'Snake Eater', 'https://youtu.be/m2OR_JaXDaM?si=P2nv6ePOr9LGEkDT', 'https://www.youtube.com/embed/m2OR_JaXDaM?si=P2nv6ePOr9LGEkDT&autoplay=1', 'Metal Gear Solid'
    ),
    (
        'Main Theme', 'https://youtu.be/UiqJzCp1vSQ?si=XVQzPSjGEMABJ-Qi', 'https://www.youtube.com/embed/UiqJzCp1vSQ?si=XVQzPSjGEMABJ-Qi&autoplay=1', 'Shenmue'
    ),
    (
        'Main Menu Theme', 'https://youtu.be/gkPrrD1FR4w?si=PoIcW-OkWWxYcPVz', 'https://www.youtube.com/embed/gkPrrD1FR4w?si=PoIcW-OkWWxYcPVz&autoplay=1', 'Tony Hawk''s Pro Skater'
    ),
    (
        'Work Your Body', 'https://youtu.be/zZzXObT_Ij4?si=wpe3M6kWma3Umcbq', 'https://www.youtube.com/embed/zZzXObT_Ij4?si=wpe3M6kWma3Umcbq&autoplay=1', '1080° Snowboarding'
    ),
    (
        'The Sun Rises', 'https://youtu.be/ya3yxTbkh5s?si=7qYxBA-8ZbpYCre-', 'https://www.youtube.com/embed/ya3yxTbkh5s?si=9UN0iLLz7EmG6kCC&autoplay=1', 'Okami'
    ),
    (
        'Main Theme', 'https://youtu.be/o8o_rmzGzP8?si=zoyoYmSk5b9INhpO', 'https://www.youtube.com/embed/o8o_rmzGzP8?si=zoyoYmSk5b9INhpO&autoplay=1', 'Tomb Raider'
    ),
    (
        'Police Station Hall Theme', 'https://youtu.be/D30IAZAhLmA?si=wWkFthDXtHJyHzP_', 'https://www.youtube.com/embed/D30IAZAhLmA?si=wWkFthDXtHJyHzP_&autoplay=1', 'Resident Evil'
    ),
    (
        'Littleroot Town', 'https://youtu.be/im6tbN9SZXs?si=3GsdLRKey-7z-4bG', 'https://www.youtube.com/embed/im6tbN9SZXs?si=3GsdLRKey-7z-4bG&autoplay=1', 'Pokemon Rubis/Saphir/Emeraude'
    ),
    (
        'Oldale Town', 'https://youtu.be/aZ5HREsFcUg?si=lgMZU6E-YA_ceOLl', 'https://www.youtube.com/embed/aZ5HREsFcUg?si=Q542bp0W0UcSYjxK&autoplay=1', 'Pokemon Rubis/Saphir/Emeraude'
    ),
    (
        'Surf', 'https://youtu.be/Pyyis1fasd0?si=MZdwDaWq5nH59FKH', 'https://www.youtube.com/embed/Pyyis1fasd0?si=GxPzkHvR2wSgfdVK&autoplay=1', 'Pokemon Rubis/Saphir/Emeraude'
    ),
    (
        'Slateport City', 'https://youtu.be/l0yo32iVGA0?si=23IsacG-UkOjmHGR', 'https://www.youtube.com/embed/l0yo32iVGA0?si=oNWtcwx7X7Ywmp9U&autoplay=1', 'Pokemon Rubis/Saphir/Emeraude'
    ),
    (
        'Gym Leader Battle', 'https://youtu.be/YRjphkDCRk4?si=VTCB7z1N0kjm7YmB', 'https://www.youtube.com/embed/YRjphkDCRk4?si=6Hm4Lp9I2f9y0-Kl&autoplay=1', 'Pokemon Rubis/Saphir/Emeraude'
    ),
    (
        'Wild Pokemon Encounter', 'https://youtu.be/OHTr8nofsAM?si=3EmU_JVNGSFQMEfZ', 'https://www.youtube.com/embed/OHTr8nofsAM?si=RV6GsMbjEFioDMp7&autoplay=1', 'Pokemon Rubis/Saphir/Emeraude'
    ),
    (
        'Opening', 'https://youtu.be/Wi3NIt5-jHc?si=N6lEmW2SHr0n7hqs', 'https://www.youtube.com/embed/Wi3NIt5-jHc?si=jw4_sC8oh3XKIEaM&autoplay=1', 'Pokemon Rubis/Saphir/Emeraude'
    ),
    (
        'Driftveil City', 'https://youtu.be/xc_0wfIuuzw?si=1XMPG7ptVhNlPim3', 'https://www.youtube.com/embed/xc_0wfIuuzw?si=1XMPG7ptVhNlPim3&autoplay=1', 'Pokemon Noir/Blanc'
    ),
    (
        'Opening Movie', 'https://youtu.be/b7oDZaUEoNo?si=LieGksjXJ0wzKRm5', 'https://www.youtube.com/embed/b7oDZaUEoNo?si=LieGksjXJ0wzKRm5&autoplay=1', 'Pokemon Diamant/Perle'
    ),
    (
        'Twinleaf Town (Day)', 'https://youtu.be/WYZd1EUHopE?si=10o1ehCKXKCo5iHh', 'https://www.youtube.com/embed/WYZd1EUHopE?si=10o1ehCKXKCo5iHh&autoplay=1', 'Pokemon Diamant/Perle'
    ),
    (
        'Battle! (Gym Leader)', 'https://youtu.be/Lv0PhpS1NMk?si=q1ArjN7aIhJVKI2I', 'https://www.youtube.com/embed/Lv0PhpS1NMk?si=q1ArjN7aIhJVKI2I&autoplay=1', 'Pokemon Diamant/Perle'
    ),
    (
        'The Ocean on His Shoulders', 'https://youtu.be/wp6QpMWaKpE?si=f-XJkDwTFp4xUvC8', 'https://www.youtube.com/embed/wp6QpMWaKpE?si=f-XJkDwTFp4xUvC8&autoplay=1', 'Bioshock'
    ),
    (
        'Cohens Masterpiece', 'https://youtu.be/nlu2z2gkhhI?si=gZSSeklBHAoYOGBv', 'https://www.youtube.com/embed/nlu2z2gkhhI?si=gZSSeklBHAoYOGBv&autoplay=1', 'Bioshock'
    ),
    (
        'Welcome to Rapture', 'https://youtu.be/sEFIZh_Zscc?si=Jbw3hJkrPxe8JAKF', 'https://www.youtube.com/embed/sEFIZh_Zscc?si=Jbw3hJkrPxe8JAKF&autoplay=1', 'Bioshock'
    ),
    (
        'Legends of Azeroth', 'https://youtu.be/800be1ZmGd0?si=g3qXlFkZ_t41EsHV', 'https://www.youtube.com/embed/800be1ZmGd0?si=g3qXlFkZ_t41EsHV&autoplay=1', 'World of Warcraft'
    ),
    (
        'Invincible', 'https://youtu.be/4n6WP9qHyRM?si=uvqZ888X8svZP53q', 'https://www.youtube.com/embed/4n6WP9qHyRM?si=uvqZ888X8svZP53q&autoplay=1', 'World of Warcraft'
    ),
    (
        'Stormwind (City Theme)', 'https://youtu.be/QYidb1LvMs8?si=Gb0jdQIBb5cD3HJN', 'https://www.youtube.com/embed/QYidb1LvMs8?si=Gb0jdQIBb5cD3HJN&autoplay=1', 'World of Warcraft'
    ),
    (
        'Orgrimmar', 'https://youtu.be/gSjf5ChDDqQ?si=G5PxU8ipgPeUzGGm', 'https://www.youtube.com/embed/gSjf5ChDDqQ?si=G5PxU8ipgPeUzGGm&autoplay=1', 'World of Warcraft'
    ),
    (
        'Elwynn Forest', 'https://youtu.be/uvW-QTiZLQ0?si=L-CGuPgdyKvXrKTD', 'https://www.youtube.com/embed/uvW-QTiZLQ0?si=L-CGuPgdyKvXrKTD&autoplay=1', 'World of Warcraft'
    ),
    (
        'Title Screen (Baba Yetu)', 'https://youtu.be/5e0Qelqp-Cc?si=OCWNeCLuhdqR8f7x', 'https://www.youtube.com/embed/5e0Qelqp-Cc?si=OCWNeCLuhdqR8f7x&autoplay=1', 'Civilization'
    ),
    (
        'Dr. Wily Stage 1', 'https://youtu.be/aTbfpkByIM8?si=Z4ikIRTNPAKEzYwp', 'https://www.youtube.com/embed/aTbfpkByIM8?si=FNglViTN7Ag0wncx&autoplay=1', 'Mega Man'
    ),
    (
        'Title Theme', 'https://youtu.be/ZT9DST_M_g8?si=GdL9kaGIs1z3W3Mn', 'https://www.youtube.com/embed/ZT9DST_M_g8?si=GdL9kaGIs1z3W3Mn&autoplay=1', 'Mega Man'
    ),
    (
        'Weight of the World', 'https://youtu.be/Dsk3DTdTY3Y?si=BVq_yfGdFTZ6Q0bf', 'https://www.youtube.com/embed/Dsk3DTdTY3Y?si=BVq_yfGdFTZ6Q0bf&autoplay=1', 'Nier: Automata'
    ),
    (
        'Amusement Park', 'https://youtu.be/8jpJM6nc6fE?si=mZzVHU5oM81Ot9h8', 'https://www.youtube.com/embed/8jpJM6nc6fE?si=mZzVHU5oM81Ot9h8&autoplay=1', 'Nier: Automata'
    ),
    (
        'Wake Up, Get Up, Get Out There', 'https://youtu.be/azNG-AU0eGg?si=-SiGVlt4teQ_Nzsa', 'https://www.youtube.com/embed/azNG-AU0eGg?si=-SiGVlt4teQ_Nzsa&autoplay=1', 'Persona 5'
    ),
    (
        'Life Will Change', 'https://youtu.be/dsuJZx24V_A?si=8P4Qd55r-vm2yMch', 'https://www.youtube.com/embed/dsuJZx24V_A?si=ynUSu8WmhGpBFzRQ&autoplay=1', 'Persona 5'
    ),
    (
        'Smile and Tears', 'https://youtu.be/KQVOb1b7iOc?si=C9YTRlIstrL8yB9S', 'https://www.youtube.com/embed/KQVOb1b7iOc?si=C9YTRlIstrL8yB9S&autoplay=1', 'EarthBound'
    ),
    (
        'Onett Theme', 'https://youtu.be/XKfXsTkA71I?si=uRMaomWXnU-Ur0Gt', 'https://www.youtube.com/embed/XKfXsTkA71I?si=IMHOABqTvptEgYZR&autoplay=1', 'EarthBound'
    ),
    (
        'Together We Ride', 'https://youtu.be/yERQqvP0598?si=q6l8Ny3bQPdhNGjv', 'https://www.youtube.com/embed/yERQqvP0598?si=45_0hH1FeZlrpXjq&autoplay=1', 'Fire Emblem'
    ),
    (
        'Lost in Thoughts All Alone', 'https://youtu.be/eyBVIlAyZj4?si=89xgM-9SoGqNsfFa', 'https://www.youtube.com/embed/eyBVIlAyZj4?si=89xgM-9SoGqNsfFa&autoplay=1', 'Fire Emblem'
    ),
    (
        'Hazardous Environments', 'https://youtu.be/UthQ2gR1bU4?si=zXIwpakwzjW3okV5', 'https://www.youtube.com/embed/UthQ2gR1bU4?si=zXIwpakwzjW3okV5&autoplay=1', 'Half-Life'
    ),
    (
        'Vortal Combat', 'https://youtu.be/7eXuoJD0cTc?si=ijy1FM5v9AoCRdhd', 'https://www.youtube.com/embed/7eXuoJD0cTc?si=ijy1FM5v9AoCRdhd&autoplay=1', 'Half-Life'
    );