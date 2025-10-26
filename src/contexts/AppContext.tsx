import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { SimulationResult, AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [simulations, setSimulations] = useState<SimulationResult[]>([]);
  const [currentSimulation, setCurrentSimulation] = useState<SimulationResult | null>(null);

  // Load simulations from Firebase when user changes
  useEffect(() => {
    if (auth.currentUser) {
      loadSimulationsFromFirebase();
    } else {
      setSimulations([]);
      setCurrentSimulation(null);
    }
  }, [auth.currentUser]);

  const saveSimulationToFirebase = async (simulation: SimulationResult) => {
    if (!auth.currentUser) {
      console.error('No user logged in');
      return;
    }

    try {
      const simulationWithUser = {
        ...simulation,
        userId: auth.currentUser.uid,
        timestamp: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'simulations'), simulationWithUser);
      
      // Update local state
      const newSimulation = { ...simulationWithUser, id: docRef.id };
      const updatedSimulations = [newSimulation, ...simulations].slice(0, 50);
      setSimulations(updatedSimulations);
      setCurrentSimulation(newSimulation);
      
    } catch (error) {
      console.error('Error saving simulation to Firebase:', error);
      throw error;
    }
  };

  const loadSimulationsFromFirebase = async () => {
    if (!auth.currentUser) return;

    try {
      const q = query(
        collection(db, 'simulations'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const userSimulations: SimulationResult[] = [];
      
      querySnapshot.forEach((doc) => {
        userSimulations.push({ ...doc.data(), id: doc.id } as SimulationResult);
      });
      
      setSimulations(userSimulations);
    } catch (error) {
      console.error('Error loading simulations from Firebase:', error);
    }
  };

  const deleteSimulationFromFirebase = async (simulationId: string) => {
    try {
      await deleteDoc(doc(db, 'simulations', simulationId));
      const updated = simulations.filter(sim => sim.id !== simulationId);
      setSimulations(updated);
      if (currentSimulation?.id === simulationId) {
        setCurrentSimulation(null);
      }
    } catch (error) {
      console.error('Error deleting simulation from Firebase:', error);
    }
  };

  const addSimulation = (simulation: SimulationResult) => {
    const newSimulation = {
      ...simulation,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      userId: auth.currentUser?.uid
    };
    
    const updatedSimulations = [newSimulation, ...simulations].slice(0, 50);
    setSimulations(updatedSimulations);
    setCurrentSimulation(newSimulation);
    
    // Also save to Firebase
    if (auth.currentUser) {
      saveSimulationToFirebase(simulation).catch(error => {
        console.error('Failed to save simulation to Firebase:', error);
      });
    }
  };

  const clearSimulations = () => {
    setSimulations([]);
    setCurrentSimulation(null);
  };

  const value = {
    simulations,
    addSimulation,
    clearSimulations,
    currentSimulation,
    setCurrentSimulation,
    saveSimulationToFirebase,
    loadSimulationsFromFirebase,
    deleteSimulationFromFirebase
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};