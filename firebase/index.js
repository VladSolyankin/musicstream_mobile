import {db, storage} from './config.js'
import {addDoc, arrayUnion, collection, doc, getDocs, query, setDoc, updateDoc, where} from 'firebase/firestore'
import {getDownloadURL, ref} from 'firebase/storage'


export const addNewUser = async (uid, email) => {

	await addDoc(collection(db, `users`), {uid})

	const newUser = {
		likedTracks: [],
		email: email
	}

	await addDoc(collection(doc(db, "users", uid), "playlists"), {})
	await setDoc(doc(db, `users/${uid}`), newUser)
}

export const addNewPlaylist = async (uid, playlistId, title, imagePath) => {

	const newPlaylist = {
		id: playlistId,
		title: title,
		imagePath: imagePath,
		tracks: []
	}

	await addDoc(collection(db, `users/${uid}/playlists`), newPlaylist)
}

export const addNewPlaylistTrack = async (uid, playlistId, playlistPreview, trackId) => {

	const q =
		query(collection(db, `users/${uid}/playlists`),
			where('id', '==', playlistId))
	const getSelectedDoc = await getDocs(q)

	getSelectedDoc.forEach( (doc) => {
		updateDoc(doc.ref, { tracks: arrayUnion({trackId: trackId, preview_url: playlistPreview}) })
	})

}

export const deletePlaylistTrack = async (uid, playlistId, trackId) => {
	const q = query(collection(db, `users/${uid}/playlists`), where('id', '==', playlistId))

	const deletePlaylist = await getDocs(q)

	deletePlaylist.forEach( playlist => {
		const playlistData = playlist.data()
		if (playlist && playlistData) {
			let playlistTracks = playlistData.tracks
			const updatedTracks = playlistTracks.filter(track => track.trackId !== trackId)

			const playlistDoc = doc(db, `users/${uid}/playlists/${playlist.id}`)
			updateDoc(playlistDoc, {tracks: updatedTracks})
		}
	})
}

export const getUserPlaylists = async (uid) => {
	let userPlaylists = []
	const userDocs = await getDocs(collection(db, `users/${uid}/playlists`))
	userDocs.forEach(playlist => {
		userPlaylists = [...userPlaylists, playlist.data()]
	})

	return userPlaylists
}

export const getPlaylistTracks = async (uid, playlistId) => {
	let userPlaylistTrackIds = []
	const q =
		query(collection(db, `users/${uid}/playlists`),
			where('id', '==', playlistId))

	const getSelectedDoc = await getDocs(q)

	getSelectedDoc.forEach( (doc) => userPlaylistTrackIds = doc.data()["tracks"])

	return userPlaylistTrackIds
}

export const getStorageImage = async (path) => {
	const imageRef = ref(storage, path)

	return await getDownloadURL(imageRef)
}

export const getUsers = async () => {
	const querySnapshot = await getDocs(collection(db, "users"));
	querySnapshot.forEach((doc) => {
		return doc.data()
	});
}