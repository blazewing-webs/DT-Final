
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCWI6Ic9C_lJknIBVifyBJtEXWUbquxpHM",
    authDomain: "diravida-thalaimurai.firebaseapp.com",
    projectId: "diravida-thalaimurai",
    storageBucket: "diravida-thalaimurai.firebasestorage.app",
    messagingSenderId: "486213751506",
    appId: "1:486213751506:web:268198533b16daa107530b",
    measurementId: "G-KETJJSJQMK"
};

// User provided videos
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
    console.log("Initializing Firebase...");
    try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        console.log("Seeding YouTube videos...");
        for (const video of videos) {
            await addDoc(collection(db, "youtube_videos"), {
                ...video,
                createdAt: serverTimestamp()
            });
            console.log(`Added: ${video.title}`);
        }
        console.log("Done! Videos added.");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding:", error);
        process.exit(1);
    }
}

seed();
