import React, { useState, useEffect } from "react";
import { Layout, Menu, Input, Button, notification, Dropdown } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import axios from "axios";

const { Header, Sider, Content } = Layout;

const AdminPanel = () => {
  const [centreName, setCentreName] = useState("");
  const [sportName, setSportName] = useState("");
  const [centres, setCentres] = useState([]);
  const [selectedCentre, setSelectedCentre] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activePanel, setActivePanel] = useState("dashboard"); // New state to track active panel

  // Fetch centres from the API
  const fetchCentres = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/centre/all`);
    //   console.log(response.data);
      setCentres(response.data);
    } catch (error) {
      console.error("Error fetching centres:", error);
    }
  };

  useEffect(() => {
    fetchCentres();
  }, []);

  // Handle adding a new centre
  const handleAddCentre = async () => {
    if (!centreName.trim()) {
      notification.warning({
        message: "Input Error",
        description: "Centre name cannot be empty!",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:5000/api/centre/new`, {
        name: centreName,
      });

      if (response.status === 201) {
        notification.success({
          message: "Success",
          description: `Centre "${centreName}" added successfully!`,
        });
        setCentreName("");
      } else {
        notification.error({
          message: "Error",
          description: "Failed to add the centre. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error adding centre:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while adding the centre.",
      });
    }

    setLoading(false);
  };

  // Handle adding a new sport to the selected centre
  const handleAddSport = async () => {
    if (!sportName.trim()) {
      notification.warning({
        message: "Input Error",
        description: "Sport name cannot be empty!",
      });
      return;
    }
    if (!selectedCentre) {
      notification.warning({
        message: "Selection Error",
        description: "Please select a centre first.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/centre/${selectedCentre._id}/addsport`,
        { name: sportName }
      );

      if (response.status === 200) {
        notification.success({
          message: "Success",
          description: `Sport "${sportName}" added successfully to ${selectedCentre.name}!`,
        });
        setSportName("");
      } else {
        notification.error({
          message: "Error",
          description: "Failed to add the sport. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error adding sport:", error);
      notification.error({
        message: "Error",
        description: "An error occurred while adding the sport.",
      });
    }

    setLoading(false);
  };

  // Create menu for centres dropdown
  const centreMenu = (
    <Menu>
      {centres.map((centre) => (
        <Menu.Item key={centre._id} onClick={() => setSelectedCentre(centre)}>
          {centre.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  // Handle sidebar item clicks
  const handleMenuClick = (key) => {
    setActivePanel(key);
  };

  // Render Dashboard Panel (list of centres and their sports)
  const renderDashboardPanel = () => (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4">Centres and their Sports</h2>
      {centres.length === 0 ? (
        <p className="text-center">No centres available.</p>
      ) : (
        centres.map((centre) => (
            <div key={centre._id} className="mb-6 p-4 border rounded-lg shadow-md bg-gray-50">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{centre.name}</h3>
                {Array.isArray(centre.sports) && centre.sports.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {centre.sports.map((sport, index) => (
                        <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                        >
                        <div>
                            <h4 className="text-lg font-medium text-gray-700">{sport.name}</h4>
                            <p className="text-sm text-gray-500">Courts count: {sport.courts.length}</p>
                        </div>
                        <div className="text-lg font-semibold text-blue-500">{sport.courts.length}</div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-lg text-gray-600">No sports added yet.</p>
                )}
            </div>
        ))
      )}
    </div>
  );
  

  // Render Centres Panel (form to add a new centre)
  const renderCentresPanel = () => (
    <div>
      <div className="text-2xl font-bold mb-4 text-center">Add Centre</div>
      <div className="flex flex-col mb-4">
        <Input
          className="mb-4"
          placeholder="Enter Centre Name"
          value={centreName}
          onChange={(e) => setCentreName(e.target.value)}
        />
        <Button
          type="primary"
          onClick={handleAddCentre}
          loading={loading}
          disabled={!centreName.trim()}
        >
          Add Centre
        </Button>
      </div>
    </div>
  );

  // Render Sports Panel (form to add sports to a centre)
  const renderSportsPanel = () => (
    <div>
      <div className="text-2xl font-bold mb-4 text-center">Add Sport to Centre</div>
      <div className="flex flex-col mb-4">
        <Dropdown overlay={centreMenu} trigger={["click"]}>
          <Button className="mb-4">
            {selectedCentre ? selectedCentre.name : "Select Centre"}
          </Button>
        </Dropdown>

        <Input
          className="mb-4"
          placeholder="Enter Sport Name"
          value={sportName}
          onChange={(e) => setSportName(e.target.value)}
        />
        <Button
          type="primary"
          onClick={handleAddSport}
          loading={loading}
          disabled={!sportName.trim() || !selectedCentre}
        >
          Add Sport to Centre
        </Button>
      </div>
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider width={200} className="site-layout-background" theme="dark">
        <div className="logo" style={{ padding: "16px", color: "white" }}>
          Game Theory
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="dashboard" icon={<MenuOutlined />} onClick={() => handleMenuClick("dashboard")}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="centres" icon={<MenuOutlined />} onClick={() => handleMenuClick("centres")}>
            Add Centre
          </Menu.Item>
          <Menu.Item key="sports" icon={<MenuOutlined />} onClick={() => handleMenuClick("sports")}>
            Add Sport
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout className="site-layout">
        {/* Navbar */}
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            backgroundColor: "#001529",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "white",
          }}
        >
          <div className="logo" style={{ paddingLeft: "16px", fontSize: "20px" }}>
            Admin Dashboard
          </div>
        </Header>

        {/* Content */}
        <Content
          style={{
            padding: "0 50px",
            marginTop: 16,
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        >
          <div className="site-layout-content">
            {activePanel === "dashboard" && renderDashboardPanel()}
            {activePanel === "centres" && renderCentresPanel()}
            {activePanel === "sports" && renderSportsPanel()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
