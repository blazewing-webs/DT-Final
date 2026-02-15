
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import fs from 'fs';

const firebaseConfig = {
    apiKey: "AIzaSyCWI6Ic9C_lJknIBVifyBJtEXWUbquxpHM",
    authDomain: "diravida-thalaimurai.firebaseapp.com",
    projectId: "diravida-thalaimurai",
    storageBucket: "diravida-thalaimurai.firebasestorage.app",
    messagingSenderId: "486213751506",
    appId: "1:486213751506:web:268198533b16daa107530b",
    measurementId: "G-KETJJSJQMK"
};

const videos = [
    {
        title: "Dravidian Ideology Explained",
        url: "https://youtu.be/kKl9qPDtYZc?si=2CjXQvcFWqLxByMF",
        videoId: "kKl9qPDtYZc"
    },
    {
        title: "History of the Movement",
        url: "https://youtu.be/XVlUG6wlVJs?si=R7Yjkw-lZEdV7_-v",
        videoId: "XVlUG6wlVJs"
    },
    {
        title: "Social Justice Impact",
        url: "https://youtu.be/ybid6nvZ528?si=ThxIzhv2yIJwZ4zm",
        videoId: "ybid6nvZ528"
    }
];

async function seed() {
    fs.writeFileSync('seed_log.txt', 'Starting seeding...\n');
    try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        for (const video of videos) {
            await addDoc(collection(db, "youtube_videos"), {
                ...video,
                createdAt: serverTimestamp()
            });
            fs.appendFileSync('seed_log.txt', `Added: ${video.title}\n`);
        }
        fs.appendFileSync('seed_log.txt', 'Done!\n');
        console.log("Done!");
        process.exit(0);
    } catch (error) {
        fs.appendFileSync('seed_log.txt', `Error: ${error.message}\n`);
        console.error(error);
        process.exit(1);
    }
}

seed();
