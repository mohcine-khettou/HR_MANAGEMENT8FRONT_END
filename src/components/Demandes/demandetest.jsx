import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export const Demande = () => {
    const exampleCustomers = [
    { id: 1, name: 'Attestation de', date: '00-00-0000' , etat: 'En cours', representative: <a>Anuuler</a>  },
    { id: 2, name: 'Attestation de', date: '00-00-0000' , etat: 'En cours', representative: 'Bob Williams'  },
    { id: 3, name: 'Attestation de', date: '00-00-0000' , etat: 'En cours', representative: 'Carol Davis'  },
    { id: 4, name: 'Attestation de', date: '00-00-0000' , etat: 'En cours', representative: 'David Miller'  },
    { id: 5, name: 'Attestation de', date: '00-00-0000' , etat: 'En cours', representative:  'Emily Martinez'  },
    
];
    const [customers, setCustomers] = useState(exampleCustomers);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;
    const deleteButton = (rowData) => {
        return <Button type="button" className="p-button-danger" onClick={() => deleteRow(rowData)} >Annuler</Button>;
    };
    
  return (
    
    <div>

    {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Our products
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">
                        Silver
                    </td>
                    <td className="px-6 py-4">
                        Laptop
                    </td>
                    <td className="px-6 py-4">
                        $2999
                    </td>
                    <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Microsoft Surface Pro
                    </th>
                    <td className="px-6 py-4">
                        White
                    </td>
                    <td className="px-6 py-4">
                        Laptop PC
                    </td>
                    <td className="px-6 py-4">
                        $1999
                    </td>
                    <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
                <tr className="bg-white dark:bg-gray-800">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Magic Mouse 2
                    </th>
                    <td className="px-6 py-4">
                        Black
                    </td>
                    <td className="px-6 py-4">
                        Accessories
                    </td>
                    <td className="px-6 py-4">
                        $99
                    </td>
                    <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div> */}
    <div className='flex m-5 '>
    <i className="pi pi-file-o mr-2 text-[3.35rem]"></i>
    <h1 className='text-[2.35rem] font-semibold'>Demandes</h1>
    </div>



    <div className="m-11 mb-0 card">
        <DataTable value={customers} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="typeDemmande" header="Demande" style={{ width: '25%' }}></Column>
            <Column field="date" header="Date" style={{ width: '25%' }}></Column>
            <Column field="etat" header="Etat" style={{ width: '25%' }}></Column>
            <Column header="Action" body={deleteButton} style={{ width: '25%' }} />
        </DataTable>
    </div>
    
    </div>
  )
}
