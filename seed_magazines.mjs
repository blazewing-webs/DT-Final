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

const SAMPLE_MAGAZINES = [
    {
        title: "Magazine 1",
        month: "அக்டோபர் 2025",
        coverUrl: "/magazines/magazine-1.jpg",
        pdfUrl: "#",
    },
    {
        title: "Magazine 2",
        month: "ஜூலை 2025",
        coverUrl: "/magazines/magazine-2.jpg",
        pdfUrl: "#",
    },
    {
        title: "Magazine 3",
        month: "டிசம்பர் 2025",
        coverUrl: "/magazines/magazine-3.jpg",
        pdfUrl: "#",
    }
];

async function seed() {
    console.log("Seeding Magazines...");
    try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        for (const mag of SAMPLE_MAGAZINES) {
            await addDoc(collection(db, "magazines"), {
                ...mag,
                createdAt: serverTimestamp()
            });
            console.log(`Added Magazine: ${mag.title}`);
        }
        console.log("Done!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding:", error);
        process.exit(1);
    }
}

seed();
