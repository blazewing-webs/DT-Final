import FeaturedGrid from "@/components/news/FeaturedGrid";
import CategoryFeed from "@/components/news/CategoryFeed"; // Added
import CategorySection from "@/components/news/CategorySection";
import NewsCard from "@/components/news/NewsCard";
import Sidebar from "@/components/news/Sidebar";
import RecursiveTimeline from "@/components/news/RecursiveTimeline";

import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";

// Extra Content Components
import QuoteBanner from "@/components/home/QuoteBanner";
import IdeologySection from "@/components/home/IdeologySection";
import TimelineSection from "@/components/home/TimelineSection";
import BookRecommendations from "@/components/home/BookRecommendations";
import FAQSection from "@/components/home/FAQSection";
import JoinCTA, { Disclaimer } from "@/components/home/JoinCTA";

// --- Regional News Data (Coonoor Edition) ---

const POLITICS_NEWS = [
    {
        id: "p1",
        title: "Coonoor Municipality Budget Focuses on Drainage Improvement",
        excerpt: "குன்னூர் நகராட்சி பட்ஜெட்டில் மழைக்கால முன்னெச்சரிக்கையாக ரூ.2 கோடி செலவில் புதிய வடிகால் வசதிகள் அமைக்க ஒப்புதல்.",
        image: "https://images.unsplash.com/photo-1541844053-a3d2e32655dc?auto=format&fit=crop&q=80&w=1000",
        category: "அரசியல்",
        author: "நகராட்சி நிருபர்",
        date: "இன்று",
        slug: "coonoor-municipal-budget-drainage",
    },
    {
        id: "p2",
        title: "Social Justice Audit in Private Tea Estates",
        excerpt: "தனியார் தேயிலைத் தோட்டங்களில் தொழிலாளர் நலச்சட்டங்கள் முறையாகப் பின்பற்றப்படுகின்றனவா என மாவட்ட நிர்வாகம் திடீர் ஆய்வு.",
        image: "https://images.unsplash.com/photo-1589139486061-6d7e2dc3a681?auto=format&fit=crop&q=80&w=1000",
        category: "சமூக நீதி",
        author: "தொழிலாளர் நலம்",
        date: "இன்று",
        slug: "estate-labor-audit",
    },
    {
        id: "p3",
        title: "Badaga Community Reiterates Demand for ST Status",
        excerpt: "படுகர் இன மக்கள் தங்களை பழங்குடியினர் பட்டியலில் (ST) சேர்க்கக் கோரி குன்னூர் வி.பி. தெருவில் அமைதிப் பேரணி.",
        image: "https://images.unsplash.com/photo-1576487132475-693d3957cc43?auto=format&fit=crop&q=80&w=1000",
        category: "சமூகம்",
        author: "செய்தியாளர்",
        date: "இன்று",
        slug: "badaga-st-status-rally",
    },
    {
        id: "p4",
        title: "Wellington Cantonment Board Election Update",
        excerpt: "வெலிங்டன் கண்டோன்மென்ட் வாரியத் தேர்தலில் போட்டியிடும் வேட்பாளர்கள் அரவங்காடு பகுதியில் தீவிர வாக்கு சேகரிப்பு.",
        image: "https://images.unsplash.com/photo-1595683259103-3a70d0969112?auto=format&fit=crop&q=80&w=1000",
        category: "தேர்தல்",
        author: "அரசியல் பிரிவு",
        date: "இன்று",
        slug: "wellington-cantonment-election",
    },
    {
        id: "p5",
        title: "Anti-Plastic Drive Strict Enforcement in Sims Park",
        excerpt: "சூழல் பாதுகாப்பை உறுதி செய்ய சிம்ஸ் பூங்கா மற்றும் லாம்ப்ஸ் ராக் பகுதிகளில் பிளாஸ்டிக் பயன்பாட்டிற்கு கடும் அபராதம்.",
        image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=1000",
        category: "நிர்வாகம்",
        author: "சுற்றுச்சூழல் பிரிவு",
        date: "இன்று",
        slug: "plastic-ban-sims-park",
    },
    {
        id: "p6",
        title: "Tribal Welfare Meeting at Kolacombai",
        excerpt: "கோத்தகிரி மற்றும் கொலக்கம்பை பழங்குடியின கிராமங்களில் அடிப்படை வசதிகள் குறித்து மாவட்ட ஆட்சியர் தலைமையில் கூட்டம்.",
        image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=1000",
        category: "நிர்வாகம்",
        author: "மாவட்ட செய்திகள்",
        date: "நேற்று",
        slug: "tribal-welfare-meet",
    },
    {
        id: "p7",
        title: "Landslide Prevention Wall Funding for Manjoor Road",
        excerpt: "குன்னூர்-மஞ்சூர் சாலையில் அடிக்கடி நிலச்சரிவு ஏற்படும் பகுதிகளில் ரூ.50 லட்சம் மதிப்பீட்டில் தடுப்புச் சுவர்கள் கட்டும் பணி.",
        image: "https://images.unsplash.com/photo-1626006096500-a6157a9121a1?auto=format&fit=crop&q=80&w=1000",
        category: "உள்கட்டமைப்பு",
        author: "சாலைத்துறை",
        date: "நேற்று",
        slug: "manjoor-road-wall",
    },
    {
        id: "p8",
        title: "Petition for Increased Bus Services to Kotagiri",
        excerpt: "மாலை நேரங்களில் குன்னூரிலிருந்து கோத்தகிரிக்கு கூடுதல் பேருந்துகள் இயக்க வேண்டும் என பொதுமக்கள் மனு.",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000",
        category: "போக்குவரத்து",
        author: "பொதுமக்கள்",
        date: "நேற்று",
        slug: "bus-service-petition",
    },
    {
        id: "p9",
        title: "Inspection of Ration Shops in Bandishola",
        excerpt: "பண்டிசோலை நியாய விலைக் கடைகளில் பொருட்கள் தரம் மற்றும் இருப்பு குறித்து உணவு வழங்கல் அதிகாரிகள் ஆய்வு.",
        image: "https://images.unsplash.com/photo-1616422285623-13ff0167c958?auto=format&fit=crop&q=80&w=1000",
        category: "நிர்வாகம்",
        author: "செய்தியாளர்",
        date: "நேற்று",
        slug: "ration-shop-inspection",
    },
    {
        id: "p10",
        title: "Tribute to Social Reformers at Coonoor Library",
        excerpt: "திராவிட இயக்கத்தின் முன்னோடிகளுக்கு அஞ்சலி செலுத்தும் விதமாக குன்னூர் கிளை நூலகத்தில் சிறப்புச் சொற்பொழிவு.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000",
        category: "சமூகம்",
        author: "நூலகர்",
        date: "நேற்று",
        slug: "library-tribute-event",
    },
];

const EDUCATION_NEWS = [
    {
        id: "e1",
        title: "Smart Classrooms Inaugurated in Wellington Board School",
        excerpt: "வெலிங்டன் கண்டோன்மென்ட் வாரியப் பள்ளியில் நவீன வசதிகளுடன் கூடிய ஸ்மார்ட் வகுப்பறைகள் திறப்பு.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000",
        category: "கல்வி",
        author: "கல்வித் துறை",
        date: "இன்று",
        slug: "smart-classrooms-wellington",
    },
    {
        id: "e2",
        title: "Career Guidance Camp for Plantation Workers' Children",
        excerpt: "தேயிலைத் தோட்டத் தொழிலாளர்களின் குழந்தைகளுக்கான உயர்கல்வி வழிகாட்டுதல் முகாம் பெட்போர்டு பகுதியில் நடைபெற்றது.",
        image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
        category: "வழிகாட்டுதல்",
        author: "நலச் சங்கம்",
        date: "இன்று",
        slug: "career-guidance-camp",
    },
    {
        id: "e3",
        title: "NEP Workshop at Providence College",
        excerpt: "புதிய கல்விக் கொள்கை (NEP) குறித்த விழிப்புணர்வு கருத்தரங்கம் பிராவிடென்ஸ் மகளிர் கல்லூரியில் நடைபெற்றது.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
        category: "கல்வி",
        author: "கல்லூரி நிருபர்",
        date: "இன்று",
        slug: "nep-workshop-providence",
    },
    {
        id: "e4",
        title: "Coonoor Government High School Sports Meet",
        excerpt: "குன்னூர் அரசு மேல்நிலைப் பள்ளியில் வருடாந்திர விளையாட்டுப் போட்டிகள் சிம்ஸ் பூங்கா மைதானத்தில் தொடங்கின.",
        image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?auto=format&fit=crop&q=80&w=1000",
        category: "விளையாட்டு",
        author: "விளையாட்டு ஆசிரியர்",
        date: "இன்று",
        slug: "school-sports-meet",
    },
    {
        id: "e5",
        title: "Free Tablet Distribution in Aruvankadu School",
        excerpt: "அரவங்காடு அரசுப் பள்ளி 12-ம் வகுப்பு மாணவர்களுக்கு விலையில்லா மடிக்கணினிகள் (Tablets) வழங்கப்பட்டன.",
        image: "https://images.unsplash.com/photo-1588702547923-a3633d9b0366?auto=format&fit=crop&q=80&w=1000",
        category: "தொழில்நுட்பம்",
        author: "கல்வி அதிகாரி",
        date: "இன்று",
        slug: "free-tablets-aruvankadu",
    },
    {
        id: "e6",
        title: "Skill Development Center Proposal at Hubbathalai",
        excerpt: "இளைஞர்களுக்கு வேலைவாய்ப்புப் பயிற்சி அளிக்க ஹப்பத்தலை கிராமத்தில் திறன் மேம்பாட்டு மையம் அமைக்க அரசு பரிசீலனை.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
        category: "வேலைவாய்ப்பு",
        author: "மாவட்ட நிர்வாகம்",
        date: "நேற்று",
        slug: "skill-center-proposal",
    },
    {
        id: "e7",
        title: "Eco-Club Launch in St. Joseph's School",
        excerpt: "செயின்ட் ஜோசப் பள்ளியில் மாணவர்களுக்கான 'Eco-Club' தொடங்கப்பட்டது. பல்லுயிர் பெருக்கம் குறித்து விழிப்புணர்வு.",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000",
        category: "சூழல்",
        author: "பள்ளி நிர்வாகம்",
        date: "நேற்று",
        slug: "eco-club-launch",
    },
    {
        id: "e8",
        title: "Transport Subsidy for Remote Estate Students",
        excerpt: "தொலைதூர எஸ்டேட்களிலிருந்து வரும் மாணவர்களுக்கு பள்ளிப் பேருந்து கட்டணத்தில் சலுகை வழங்க பெற்றோர் சங்கம் கோரிக்கை.",
        image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=1000",
        category: "போக்குவரத்து",
        author: "பெற்றோர் சங்கம்",
        date: "நேற்று",
        slug: "student-transport-subsidy",
    },
    {
        id: "e9",
        title: "Robotics Guest Lecture at CSI College",
        excerpt: "சி.எஸ்.ஐ பொறியியல் கல்லூரியில் ரோபோட்டிக்ஸ் மற்றும் AI குறித்த சிறப்பு விரிவுரை. பெங்களூரு வல்லுநர்கள் பங்கேற்பு.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000",
        category: "கல்லூரி",
        author: "தொழில்நுட்பம்",
        date: "நேற்று",
        slug: "robotics-lecture-csi",
    },
    {
        id: "e10",
        title: "Library Renovation at Ottupattarai",
        excerpt: "ஒட்டுப்பட்டறை பகுதியில் பழுதடைந்த அரசு நூலகத்தை சீரமைக்கும் பணிகள் துவக்கம். போட்டித் தேர்வர்களுக்கு உதவும்.",
        image: "https://images.unsplash.com/photo-1507842217121-e84930dd5293?auto=format&fit=crop&q=80&w=1000",
        category: "நூலகம்",
        author: "நூலகர்",
        date: "நேற்று",
        slug: "library-renovation-ottupattarai",
    },
];

const WOMEN_NEWS = [
    {
        id: "w1",
        title: "Magalir Urimai Thogai Special Camp at Uppasi",
        excerpt: "கலைஞர் மகளிர் உரிமைத் தொகை திட்டத்தில் விடுபட்ட பயனாளிகளுக்கான சிறப்பு முகாம் உபாசி (UPASI) அரங்கில் நடைபெற்றது.",
        image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1000",
        category: "நலம்",
        author: "மகளிர் எடிட்டர்",
        date: "இன்று",
        slug: "magalir-urimai-camp",
    },
    {
        id: "w2",
        title: "Health Checkup for Women Tea Pluckers at Highfield",
        excerpt: "ஹைஃபீல்டு எஸ்டேட்டில் பெண் தொழிலாளர்களுக்கு இலவச மருத்துவ முகாம். இரத்த சோகை பரிசோதனைகள் மேற்கொள்ளப்பட்டன.",
        image: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?auto=format&fit=crop&q=80&w=1000",
        category: "சுகாதாரம்",
        author: "மருத்துவ குழு",
        date: "இன்று",
        slug: "tea-pluckers-health",
    },
    {
        id: "w3",
        title: "SHG Mushroom Cultivation Success in Yedappalli",
        excerpt: "எடப்பள்ளி கிராம மகளிர் சுயஉதவிக் குழுவினர் காளான் வளர்ப்பில் சாதனை. மாவட்ட நிர்வாகம் விருது வழங்கி கௌரவிப்பு.",
        image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&q=80&w=1000",
        category: "சுயதொழில்",
        author: "SHG நிருபர்",
        date: "இன்று",
        slug: "mushroom-cultivation-success",
    },
    {
        id: "w4",
        title: "Women's Safety Awareness Rally by Coonoor Police",
        excerpt: "பெண்கள் பாதுகாப்புக் குறித்து குன்னூர் காவல்துறை விழிப்புணர்வுப் பேரணி. 'காவலன்' செயலி குறித்து விளக்கம்.",
        image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=1000",
        category: "பாதுகாப்பு",
        author: "காவல்துறை",
        date: "இன்று",
        slug: "womens-safety-rally",
    },
    {
        id: "w5",
        title: "Maternity Ward Expansion at Lawley Hospital",
        excerpt: "குன்னூர் லாலி மருத்துவமனையில் ரூ.5 கோடி மதிப்பில் கூடுதல் மகப்பேறு வார்டு அமைக்க அடிக்கல் நாட்டப்பட்டது.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000",
        category: "மருத்துவம்",
        author: "சுகாதாரத்துறை",
        date: "இன்று",
        slug: "maternity-ward-expansion",
    },
    {
        id: "w6",
        title: "Loan Mela for Women Entrepreneurs at Bedford",
        excerpt: "பெண்கள் தொழில் தொடங்க பெட்போர்டு வங்கிகளில் சிறப்புக் கடன் மேளா. தையல் இயந்திரம், பேக்கரிக்கு முன்னுரிமை.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
        category: "வங்கி",
        author: "வங்கி மேலாளர்",
        date: "நேற்று",
        slug: "women-loan-mela",
    },
    {
        id: "w7",
        title: "Organic Farming Training for Women in Melur",
        excerpt: "மேலூர் பெண்களுக்கு இயற்கை முறையில் காய்கறி சாகுபடி குறித்து பயிற்சி. மண் வளப் பாதுகாப்பு குறித்து விளக்கம்.",
        image: "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&q=80&w=1000",
        category: "விவசாயம்",
        author: "விவசாய அதிகாரி",
        date: "நேற்று",
        slug: "organic-farming-training",
    },
    {
        id: "w8",
        title: "Legal Aid Clinic for Women at Coonoor Court",
        excerpt: "குன்னூர் நீதிமன்றத்தில் சனிக்கிழமைகளில் பெண்களுக்கு இலவச சட்ட உதவி மையம் செயல்படும் என அறிவிப்பு.",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1000",
        category: "சட்டம்",
        author: "நீதித்துறை",
        date: "நேற்று",
        slug: "legal-aid-clinic",
    },
    {
        id: "w9",
        title: "Women's Cooperative Store Opening in Vandicholai",
        excerpt: "வண்டிச்சோலையில் மகளிர் குழுக்களின் புதிய கூட்டுறவு அங்காடி திறப்பு. ஹோம்மேட் சாக்லேட், யூகலிப்டஸ் தைலம் விற்பனை.",
        image: "https://images.unsplash.com/photo-1604719312566-b7e677c66cb0?auto=format&fit=crop&q=80&w=1000",
        category: "வணிகம்",
        author: "கூட்டுறவு சங்கம்",
        date: "நேற்று",
        slug: "womens-coop-store",
    },
    {
        id: "w10",
        title: "Nutrition Kit Distribution in Jagathala",
        excerpt: "ஜகதளா அங்கன்வாடி மையங்களில் கர்ப்பிணிப் பெண்களுக்கு ஊட்டச்சத்துப் பெட்டகங்கள் வழங்கப்பட்டன.",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1000",
        category: "ஊட்டச்சத்து",
        author: "சுகாதார ஆய்வாளர்",
        date: "நேற்று",
        slug: "nutrition-kit-jagathala",
    },
];

const HISTORY_NEWS = [
    {
        id: "h1",
        title: "John Sullivan Memorial to get a Facelift",
        excerpt: "நீலகிரியை கண்டறிந்த ஜான் சல்லிவன் நினைவிடம் ரூ.10 லட்சம் செலவில் புதுப்பிக்கப்பட உள்ளது.",
        image: "https://images.unsplash.com/photo-1590059533379-f1b2123d46cb?auto=format&fit=crop&q=80&w=1000",
        category: "வரலாறு",
        author: "பாரம்பரியக் குழு",
        date: "இன்று",
        slug: "sullivan-memorial-renovation"
    },
    {
        id: "h2",
        title: "Century-Old Toda Huts Preserved in Botanical Garden",
        excerpt: "தாவரவியல் பூங்காவில் உள்ள பழமையான தோடர் இன மக்களின் குடிசைகள் (Mand) பாரம்பரியச் சின்னமாக அறிவிப்பு.",
        image: "https://images.unsplash.com/photo-1605634685328-98e3b3fb3c64?auto=format&fit=crop&q=80&w=1000",
        category: "பண்பாடு",
        author: "சுற்றுலாத்துறை",
        date: "நேற்று",
        slug: "toda-huts-preservation"
    },
    {
        id: "h3",
        title: "Heritage Walk: Tracing Coonoor's Colonial Past",
        excerpt: "குன்னூரின் காலனிய கால கட்டிடங்களை ஆவணப்படுத்தும் விதமாக கல்லூரி மாணவர்கள் பங்கேற்ற பாரம்பரிய நடைப்பயணம்.",
        image: "https://images.unsplash.com/photo-1582555547614-7227db91c942?auto=format&fit=crop&q=80&w=1000",
        category: "வரலாறு",
        author: "வரலாற்றுச் சங்கம்",
        date: "நேற்று",
        slug: "coonoor-heritage-walk"
    },
    {
        id: "h4",
        title: "NMR Toy Train: 125 Years of Engineering Marvel",
        excerpt: "நீலகிரி மலை ரயில் 125 ஆண்டுகளை நிறைவு செய்ததை ஒட்டி மேட்டுப்பாளையம்-ஊட்டி இடையே சிறப்பு ரயில் இயக்கம்.",
        image: "https://images.unsplash.com/photo-1544289895-cd14c5462817?auto=format&fit=crop&q=80&w=1000",
        category: "பாரம்பரியம்",
        author: "ரயில்வே நிருபர்",
        date: "இன்று",
        slug: "nmr-125-years"
    },
    {
        id: "h5",
        title: "Rare Photos of 19th Century Ooty Exhibition",
        excerpt: "19ஆம் நூற்றாண்டு ஊட்டியின் அரிய புகைப்படக் கண்காட்சி புனித ஸ்டீபன் தேவாலய வளாகத்தில் திறப்பு.",
        image: "https://images.unsplash.com/photo-1579275005707-160877994c63?auto=format&fit=crop&q=80&w=1000",
        category: "கண்காட்சி",
        author: "கலை ஆர்வலர்",
        date: "நேற்று",
        slug: "old-ooty-photos"
    }
];

const SOCIETY_NEWS = [
    {
        id: "s1",
        title: "Community Feast 'Badaga Habba' Celebrated",
        excerpt: "படுகர் இன மக்களின் கலாச்சார விழாவான 'ஹெத்தை அம்மன்' பண்டிகை விமரிசையாக கொண்டாடப்பட்டது.",
        image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&q=80&w=1000",
        category: "கலாச்சாரம்",
        author: "குன்னூர் நிருபர்",
        date: "இன்று",
        slug: "badaga-habba-feast"
    },
    {
        id: "s2",
        title: "Anti-Drug Awareness Cycle Rally by Youth",
        excerpt: "போதைப் பொருள் இல்லாத நீலகிரியை உருவாக்க வலியுறுத்தி இளைஞர்கள் பங்கேற்ற மாபெரும் சைக்கிள் பேரணி.",
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1000",
        category: "விழிப்புணர்வு",
        author: "சமூக ஆர்வலர்",
        date: "இன்று",
        slug: "anti-drug-rally"
    },
    {
        id: "s3",
        title: "Free Eye Camp Benefits 500 Villagers",
        excerpt: "அரவங்காடு பகுதியில் நடைபெற்ற இலவச கண் சிகிச்சை முகாமில் 500க்கும் மேற்பட்ட கிராம மக்கள் பயனடைந்தனர்.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000",
        category: "சேவை",
        author: "லயன்ஸ் கிளப்",
        date: "நேற்று",
        slug: "free-eye-camp"
    },
    {
        id: "s4",
        title: "New Old Age Home Opened in Wellington",
        excerpt: "ஆதரவற்ற முதியோர்களுக்காக வெலிங்டன் பகுதியில் புதிய காப்பகம் திறப்பு. மாவட்ட ஆட்சியர் பங்கேற்பு.",
        image: "https://images.unsplash.com/photo-1528642474498-1af0c17fd8c3?auto=format&fit=crop&q=80&w=1000",
        category: "சமூகம்",
        author: "சமூக நலத்துறை",
        date: "நேற்று",
        slug: "old-age-home-wellington"
    }
];

const EDITORS_PICKS = [
    POLITICS_NEWS[0], // Municipal Budget
    EDUCATION_NEWS[0], // Smart Classrooms
    WOMEN_NEWS[2], // SHG Mushroom Success
];

// Combine top news for FeaturedGrid (7 items for Bento)
const FEATURED_ARTICLES = [
    POLITICS_NEWS[0], // Main: Municipal Budget
    POLITICS_NEWS[1], // Estate Audit
    EDUCATION_NEWS[0], // Smart Classrooms
    WOMEN_NEWS[0], // Magalir Urimai Thogai
    WOMEN_NEWS[1], // Tea Pluckers Health
    EDUCATION_NEWS[2], // NEP Workshop
    POLITICS_NEWS[2], // Badaga ST Status
];

const TIMELINE_DATA = [
    {
        id: "t1",
        time: "10:30 AM",
        title: "Collector Visits Landslide Site",
        description: "District Collector is inspecting the repair works at Manjoor road.",
        children: [
            {
                id: "t1-1",
                time: "10:45 AM",
                title: "Funding Announced",
                description: "Rs. 50 Lakhs released immediately for retaining wall."
            }
        ]
    },
    {
        id: "t2",
        time: "09:15 AM",
        title: "Traffic Alert: Coonoor-Ooty",
        description: "Heavy traffic near Valley View due to misty conditions. Drive slowly.",
    },
    {
        id: "t3",
        time: "08:00 AM",
        title: "Tea Auction Begins",
        description: "Weekly tea auction at Coonoor Tea Trade Association (CTTA) starts with high demand for orthodox leaf.",
        children: [
            {
                id: "t3-1",
                time: "08:30 AM",
                title: "Price Surge",
                description: "Average price up by Rs. 5 per kg compared to last week."
            },
            {
                id: "t3-2",
                time: "09:00 AM",
                title: "Export Orders",
                description: "Large orders received from European buyers."
            }
        ]
    },
    {
        id: "t4",
        time: "Yesterday",
        title: "Flower Show Preparation",
        description: "Sims Park closed for 2 hours for maintenance ahead of the annual flower show.",
    }
];

import Footer from "@/components/layout/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-white font-sans">
            <TopBar />
            <Navbar />

            <div className="container mx-auto px-4 md:px-6 py-8">
                {/* Featured Section (Bento Grid - Needs 7 items) */}
                <FeaturedGrid
                    quote="மலைகளின் அரசியே, நீலகிரியே! உன் வளம் காப்போம், உன் நலம் காப்போம்."
                    quoteAuthor="குன்னூர் நிருபர்"
                />
            </div>

            {/* Daily Quote Banner */}
            <QuoteBanner />

            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Column */}
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        {/* Politics Section */}
                        <CategoryFeed
                            title="அரசியல்"
                            queryCategory="அரசியல் (Politics)"
                            href="/politics"
                        />

                        {/* Education Section */}
                        <CategoryFeed
                            title="கல்வி"
                            queryCategory="கல்வி (Education)"
                            href="/education"
                        />

                        {/* History Section */}
                        <CategoryFeed
                            title="வரலாறு"
                            queryCategory="வரலாறு (History)"
                            href="/history"
                        />

                        {/* Society Section */}
                        <CategoryFeed
                            title="சமூகம்"
                            queryCategory="சமூகம் (Society)"
                            href="/society"
                        />

                        {/* Women's Welfare Section */}
                        <CategoryFeed
                            title="பெண்கள் நலம்"
                            queryCategory="பெண்கள் நலம் (Women)"
                            href="/women"
                        />
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4 h-full relative">
                        <Sidebar title="ஆசிரியர் தேர்வு (Editor's Picks)" articles={EDITORS_PICKS} />

                        {/* Ad Widget */}
                        <div className="mt-8 bg-neutral-100 p-8 text-center border border-neutral-200 h-64 flex items-center justify-center rounded-xl">
                            <span className="text-neutral-400 font-bold uppercase tracking-widest">விளம்பரம் (Advertisement)</span>
                        </div>

                        {/* Sticky Timeline */}
                        <div className="sticky top-24 mt-8">
                            <RecursiveTimeline
                                title="Live Updates: Coonoor"
                                items={TIMELINE_DATA}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
