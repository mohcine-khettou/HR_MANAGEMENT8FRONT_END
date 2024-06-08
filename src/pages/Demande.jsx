import React, { useState, useEffect } from 'react';
import { useUserContext } from '../context';
import RhDemmande from './RhDemmande';
import ProfDemande from './ProfDemande';

export const Demande = () => {
    const { user } = useUserContext();

    return (
        <div>
            {user.role === "RH" ? (
                <RhDemmande />
            ) : (
                <ProfDemande />
            )}
        </div>
    );
};

export default Demande;
