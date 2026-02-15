const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, serverTimestamp } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyCWI6Ic9C_lJknIBVifyBJtEXWUbquxpHM",
    authDomain: "diravida-thalaimurai.firebaseapp.com",
    projectId: "diravida-thalaimurai",
    storageBucket: "diravida-thalaimurai.firebasestorage.app",
    messagingSenderId: "486213751506",
    appId: "1:486213751506:web:268198533b16daa107530b",
    measurementId: "G-KETJJSJQMK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const faqs = [
    {
        question: "திராவிட தலைமுறை அரசியல் கட்சியா?",
        answer: "இல்லை. இது ஒரு சிந்தனை இயக்கம்."
    },
    {
        question: "யார் வேண்டுமானாலும் இணையலாமா?",
        answer: "ஆம். சாதி, மதம், பாலினம் வேறுபாடு இல்லை."
    }
];

async function seed() {
    console.log("Seeding FAQs...");
    try {
        for (const faq of faqs) {
            await addDoc(collection(db, "faqs"), {
                ...faq,
                createdAt: serverTimestamp()
            });
            console.log(`Added: ${faq.question}`);
        }
        console.log("Done!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding:", error);
        process.exit(1);
    }
}

seed();
