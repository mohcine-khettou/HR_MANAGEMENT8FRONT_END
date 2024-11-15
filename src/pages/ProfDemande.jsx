import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { useUserContext } from "../context";
import customFetch from "../utils/customFetch";

const ProfDemande = () => {
  const { user } = useUserContext();
  const [visible, setVisible] = useState(false);
  const [demandes, setDemandes] = useState([]);
  const [typeDemmande, setTypeDemmande] = useState("");
  const [pieceJointe, setPieceJointe] = useState(null);
  const [justification, setJustification] = useState("");
  const id = user.doti;
  const role = user.role;

  const fetchDemandes = async () => {
    try {
      const response = await customFetch.get(`/api/v1/demmandes/${id}`);
      if (response.status === 200) {
        setDemandes(response.data);
      } else {
        console.error("Failed to fetch demandes");
      }
    } catch (error) {
      console.error("Error fetching demandes:", error);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, [id]);

  const handleAddDemmande = async () => {
    const formData = new FormData();
    formData.append("typeDemmande", typeDemmande);
    formData.append("dateDemmande", new Date().toISOString());
    formData.append("status", "EN_ATTENTE");
    formData.append("doti", id);

    try {
      const response = await customFetch.post(
        `/api/v1/demmandes/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setDemandes([...demandes, response.data]);
        fetchDemandes();
        setVisible(false);
      } else {
        console.error("Failed to add demande");
      }
    } catch (error) {
      console.error("Error adding demande:", error);
    }
  };

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <span className="font-bold white-space-nowrap">
        Modification du profil
      </span>
    </div>
  );

  const footerContent = (
    <div>
      <Button
        label="Envoyer"
        icon="pi pi-check"
        onClick={handleAddDemmande}
        autoFocus
      />
    </div>
  );

  const deleteDemmande = async (idDemmande) => {
    console.log(idDemmande);
    try {
      const response = await customFetch.delete(
        `/api/v1/demmandes/delete/${idDemmande}`
      );
      if (response.status === 204) {
        const updatedDemandes = demandes.filter(
          (demande) => demande.id !== idDemmande
        );
        setDemandes(updatedDemandes);
        fetchDemandes();
      } else {
        console.error("Failed to delete demande");
      }
    } catch (error) {
      console.error("Error deleting demande:", error);
    }
  };

  const deleteButton = (rowData) => {
    return (
      <Button
        type="button"
        className="p-button-danger"
        onClick={() => deleteDemmande(rowData.doti)}
        icon="pi pi-trash"
      />
    );
  };

  const filteredDemandes = demandes.filter((demande) =>
    ["Demande1", "Demande2", "Demande3", "Demande4"].includes(
      demande.typeDemmande
    )
  );

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };

  const dateTemplate = (rowData) => {
    return formatDate(rowData.dateDemmande);
  };

  return (
    <div>
      <>
        <div className="flex justify-between items-center">
          <div className="flex m-5 ">
            <i className="pi pi-file-o mr-2 text-[3.35rem]"></i>
            <h1 className="text-[2.35rem] font-semibold">Demandes</h1>
          </div>
          <Button
            className="text-white px-3 py-[.75rem] transition duration-200 ease-in-out"
            onClick={() => setVisible(true)}
          >
            Ajouter une Demande
          </Button>
          <Dialog
            visible={visible}
            modal
            header={headerElement}
            footer={footerContent}
            style={{ width: "30rem" }}
            onHide={() => setVisible(false)}
          >
            <div className="mb-4 mt-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="typeDemmande"
              >
                Type de la demande :
              </label>
              <select
                className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                id="typeDemmande"
                value={typeDemmande}
                onChange={(e) => setTypeDemmande(e.target.value)}
              >
                <option value="Demande1">Demande1</option>
                <option value="Demande2">Demande2</option>
                <option value="Demande3">Demande3</option>
                <option value="Demande4">Demande4</option>
              </select>
            </div>
          </Dialog>
        </div>

        <div className="m-11 mb-0 card">
          <DataTable
            value={filteredDemandes}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column
              field="typeDemmande"
              header="Type de demande"
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="dateDemmande"
              header="Date de demande"
              body={dateTemplate}
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="status"
              header="Statut"
              style={{ width: "25%" }}
            ></Column>
            <Column
              header="Action"
              body={deleteButton}
              style={{ width: "25%" }}
            />
          </DataTable>
        </div>
      </>
    </div>
  );
};

export default ProfDemande;
