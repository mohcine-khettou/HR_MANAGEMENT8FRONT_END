import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { format } from 'date-fns';
import { fetchEmployees } from '../../api/listProfs';

export const ListProfs = () => {
    const [history, setHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [searchField, setSearchField] = useState(null);
    const [searchValue, setSearchValue] = useState('');

    const searchFields = [
        { label: 'Doti', value: 'doti' },
        { label: 'Nom', value: 'nom' },
        { label: 'Prénom', value: 'prenom' },
        { label: 'Date d\'effet', value: 'dateEffectGrade' },
        { label: 'CIN', value: 'cin' },
        { label: 'Role', value: 'role' }
    ];

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                const employees = await fetchEmployees();
                setHistory(employees);
                setFilteredHistory(employees);
            } catch (error) {
                console.error('Error loading employees', error);
            }
        };

        loadEmployees();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <Button className='p-2' label="Afficher" onClick={() => handleShowDetails(rowData)} />
        );
    };

    const handleShowDetails = (employee) => {
        setSelectedEmployee(employee);
        setDisplayDialog(true);
    };

    const hideDialog = () => {
        setSelectedEmployee(null);
        setDisplayDialog(false);
    };

    const dialogFooter = (
        <div>
            <Button className='p-1' label="Fermer" icon="pi pi-times" onClick={hideDialog} />
        </div>
    );

    const handleSearch = () => {
        if (searchField && searchValue) {
            const filteredData = history.filter((item) =>
                item[searchField].toString().toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredHistory(filteredData);
        } else {
            setFilteredHistory(history);
        }
    };

    return (
        <Card className="p-0">
            <div className="border-b border-b-[#dbe0e5] px-4 pb-5 pt-3 font-medium">
                Liste des professeurs
            </div>
            <div className="p-4">
                <div className="p-inputgroup">
                    <Dropdown
                        value={searchField}
                        options={searchFields}
                        onChange={(e) => setSearchField(e.value)}
                        placeholder="Select a field"
                    />
                    <InputText
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Rechercher"
                    />
                    <Button  icon="pi pi-search" onClick={handleSearch} />
                </div>
            </div>
            <div className="text-center">
                <DataTable value={filteredHistory} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
                    <Column field="doti" header="Doti" className="text-center" />
                    <Column field="nom" header="Nom" className="text-center" />
                    <Column field="prenom" header="Prénom" className="text-center" />
                    <Column
                        field="dateEffectGrade"
                        header="Date d'effet"
                        className="text-center"
                        body={(rowData) => formatDate(rowData.dateEffectGrade)}
                    />
                    <Column field="cin" header="CIN" className="text-center" />
                    <Column field="role" header="Role" className="text-center" />
                    <Column body={actionBodyTemplate} header="Détails" className="text-center" />
                </DataTable>
            </div>
            <Dialog header="Détails" visible={displayDialog} style={{ width: '50vw' }} footer={dialogFooter} onHide={hideDialog}>
                {selectedEmployee && (
                    <div>
                        <p><strong>Date de Naissance:</strong> {formatDate(selectedEmployee.dateNaissance)}</p>
                        <p><strong>Lieu de Naissance:</strong> {selectedEmployee.lieuNaissance}</p>
                        <p><strong>Poste:</strong> {selectedEmployee.post}</p>
                        <p><strong>État Civil:</strong> {selectedEmployee.etatCivil}</p>
                        <p><strong>Échelon:</strong> {selectedEmployee.echlon}</p>
                        <p><strong>Sexe:</strong> {selectedEmployee.sexe}</p>
                        <p><strong>Nombre d'Enfants:</strong> {selectedEmployee.nombreEnfants}</p>
                        <p><strong>Email:</strong> {selectedEmployee.email}</p>
                        <p><strong>Téléphone:</strong> {selectedEmployee.phoneNumber}</p>
                    </div>
                )}
            </Dialog>
        </Card>
    );
};
