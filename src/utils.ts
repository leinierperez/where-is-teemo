import { Profanity, ProfanityOptions } from '@2toad/profanity';
import { ChampionPosition, Level, Levels } from './types/Level';
import { ClickedPosition } from './types/ClickedPosition';
import { db } from './firebase';
import {
  collection,
  query,
  orderBy,
  getDocs,
  where,
  doc,
  getDoc,
  addDoc,
} from 'firebase/firestore';
import { MutationParams } from './types/MutationParams';

type Score = {
  username: string;
  levelTimeScore: number;
  levelId: string;
};

export function isClickPositionInChampionPosition(
  clickedPosition: ClickedPosition,
  targetChampion: ChampionPosition
) {
  return (
    clickedPosition.championX >= targetChampion.position.minX &&
    clickedPosition.championX <= targetChampion.position.maxX &&
    clickedPosition.championY >= targetChampion.position.minY &&
    clickedPosition.championY <= targetChampion.position.maxY
  );
}

export function getProfanity() {
  const options = new ProfanityOptions();
  options.wholeWord = false;
  return new Profanity(options);
}

export async function getLevelById(id: string | undefined) {
  if (!id) return;
  const levelsRef = doc(db, 'levels', id);
  const docSnap = await getDoc(levelsRef);
  return {
    ...docSnap.data(),
    id: docSnap.id,
  } as Level;
}

export async function getLevels() {
  let levels = [] as Levels;
  const q = query(collection(db, 'levels'), orderBy('name', 'asc'));
  const snapShot = await getDocs(q);
  snapShot.forEach((doc) => {
    levels.push({
      ...(doc.data() as Omit<Level, 'id'>),
      id: doc.id,
    });
  });
  return levels as Levels;
}

export async function getScores(levelId: string | undefined) {
  let scores = [] as Score[];
  const q = query(
    collection(db, 'scores'),
    where('levelId', '==', levelId),
    orderBy('levelTimeScore', 'asc')
  );
  const snapShot = await getDocs(q);
  snapShot.forEach((doc) => {
    scores.push(doc.data() as Score);
  });
  return scores;
}

export async function saveScore({
  username,
  id,
  elapsedSeconds,
}: MutationParams) {
  await addDoc(collection(db, 'scores'), {
    username,
    levelId: id,
    levelTimeScore: elapsedSeconds,
  });
}
