import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: 'AIzaSyBoXXFqu3x3MviQCS3jA164Ik4enzXed8I',
	authDomain: 'pos-app-e2b83.firebaseapp.com',
	projectId: 'pos-app-e2b83',
	storageBucket: 'pos-app-e2b83.firebasestorage.app',
	messagingSenderId: '441928297094',
	appId: '1:441928297094:web:34093ddf3b3ac367f8bf07',
	measurementId: 'G-MSGL4YZ05M',
}

export const app = initializeApp(firebaseConfig)
