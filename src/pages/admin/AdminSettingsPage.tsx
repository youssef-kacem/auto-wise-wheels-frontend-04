
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useToast } from '@/hooks/use-toast';
import { Settings, Key, Shield, Users, Lock, Check } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const AdminSettingsPage: React.FC = () => {
  const { toast } = useToast();
  
  // États pour les différents paramètres
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'AutoWise',
    siteDescription: 'Location de voitures premium',
    contactEmail: 'contact@autowise.com',
    supportPhone: '01 23 45 67 89',
    maintenanceMode: false,
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordComplexity: 'medium',
    sessionTimeout: 30,
  });
  
  const [adminAccounts, setAdminAccounts] = useState([
    { id: 'admin-1', name: 'Admin Principal', email: 'admin@autowise.com', role: 'super-admin', active: true },
    { id: 'admin-2', name: 'Gestionnaire', email: 'manager@autowise.com', role: 'manager', active: true },
  ]);
  
  const [newAdminData, setNewAdminData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'manager',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Gestion des formulaires
  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setGeneralSettings({ ...generalSettings, [name]: checked });
    } else {
      setGeneralSettings({ ...generalSettings, [name]: value });
    }
  };
  
  const handleSecuritySettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setSecuritySettings({ ...securitySettings, [name]: checked });
    } else {
      setSecuritySettings({ ...securitySettings, [name]: value });
    }
  };
  
  const handleNewAdminChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAdminData({ ...newAdminData, [name]: value });
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };
  
  // Soumission des formulaires
  const saveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Paramètres généraux sauvegardés",
      description: "Les modifications ont été enregistrées avec succès."
    });
  };
  
  const saveSecuritySettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Paramètres de sécurité sauvegardés",
      description: "Les modifications de sécurité ont été enregistrées avec succès."
    });
  };
  
  const addNewAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!newAdminData.name || !newAdminData.email || !newAdminData.password) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont obligatoires.",
        variant: "destructive"
      });
      return;
    }
    
    // Simuler l'ajout d'un nouvel administrateur
    const newAdmin = {
      id: `admin-${Date.now()}`,
      name: newAdminData.name,
      email: newAdminData.email,
      role: newAdminData.role,
      active: true
    };
    
    setAdminAccounts([...adminAccounts, newAdmin]);
    setNewAdminData({
      name: '',
      email: '',
      password: '',
      role: 'manager',
    });
    
    toast({
      title: "Administrateur ajouté",
      description: `${newAdminData.name} a été ajouté avec le rôle de ${
        newAdminData.role === 'super-admin' ? 'Super Admin' : 'Gestionnaire'
      }.`
    });
  };
  
  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont obligatoires.",
        variant: "destructive"
      });
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les nouveaux mots de passe ne correspondent pas.",
        variant: "destructive"
      });
      return;
    }
    
    // Simuler le changement de mot de passe
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    
    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été mis à jour avec succès."
    });
  };
  
  // Toggle du statut d'un administrateur
  const toggleAdminStatus = (id: string) => {
    setAdminAccounts(adminAccounts.map(admin => {
      if (admin.id === id) {
        const newStatus = !admin.active;
        toast({
          title: newStatus ? "Compte activé" : "Compte désactivé",
          description: `Le compte de ${admin.name} a été ${newStatus ? 'activé' : 'désactivé'}.`
        });
        return { ...admin, active: newStatus };
      }
      return admin;
    }));
  };
  
  // Supprimer un administrateur
  const deleteAdmin = (id: string) => {
    if (id === 'admin-1') {
      toast({
        title: "Action impossible",
        description: "Vous ne pouvez pas supprimer le compte Super Admin principal.",
        variant: "destructive"
      });
      return;
    }
    
    const adminToDelete = adminAccounts.find(admin => admin.id === id);
    if (adminToDelete) {
      setAdminAccounts(adminAccounts.filter(admin => admin.id !== id));
      toast({
        title: "Administrateur supprimé",
        description: `Le compte de ${adminToDelete.name} a été supprimé.`
      });
    }
  };

  return (
    <AdminLayout currentPage="Paramètres">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Menu de navigation pour les paramètres */}
        <div className="bg-white rounded-lg shadow-md p-4 h-fit">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Settings className="mr-2 h-5 w-5 text-autowise-blue" />
            Catégories
          </h3>
          <nav className="space-y-2">
            <a href="#general" className="flex items-center px-3 py-2 rounded-md bg-gray-100 text-autowise-blue">
              <Settings className="mr-2 h-4 w-4" />
              Paramètres généraux
            </a>
            <a href="#security" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
              <Shield className="mr-2 h-4 w-4" />
              Sécurité
            </a>
            <a href="#admins" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
              <Users className="mr-2 h-4 w-4" />
              Administrateurs
            </a>
            <a href="#password" className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100">
              <Key className="mr-2 h-4 w-4" />
              Mot de passe
            </a>
          </nav>
        </div>
        
        {/* Contenu principal */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          {/* Paramètres généraux */}
          <div id="general" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4 pb-2 border-b">Paramètres généraux</h2>
            
            <form onSubmit={saveGeneralSettings} className="space-y-4">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du site
                </label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Description du site
                </label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                />
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email de contact
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={generalSettings.contactEmail}
                  onChange={handleGeneralSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="supportPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone de support
                </label>
                <input
                  type="text"
                  id="supportPhone"
                  name="supportPhone"
                  value={generalSettings.supportPhone}
                  onChange={handleGeneralSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="flex items-center">
                <span className="flex-grow font-medium">Mode maintenance</span>
                <Switch
                  checked={generalSettings.maintenanceMode}
                  onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-autowise-blue text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Sauvegarder les paramètres
                </button>
              </div>
            </form>
          </div>
          
          {/* Paramètres de sécurité */}
          <div id="security" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4 pb-2 border-b">Sécurité</h2>
            
            <form onSubmit={saveSecuritySettings} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Authentification à deux facteurs</h3>
                  <p className="text-sm text-gray-500">Ajoutez une couche de sécurité supplémentaire lors de la connexion</p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                />
              </div>
              
              <div>
                <label htmlFor="passwordComplexity" className="block text-sm font-medium text-gray-700 mb-1">
                  Complexité du mot de passe
                </label>
                <select
                  id="passwordComplexity"
                  name="passwordComplexity"
                  value={securitySettings.passwordComplexity}
                  onChange={handleSecuritySettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="low">Faible (min. 6 caractères)</option>
                  <option value="medium">Moyenne (min. 8 caractères, chiffres et lettres)</option>
                  <option value="high">Élevée (min. 10 caractères, majuscules, minuscules, chiffres et caractères spéciaux)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">
                  Délai d'expiration de session (minutes)
                </label>
                <input
                  type="number"
                  id="sessionTimeout"
                  name="sessionTimeout"
                  value={securitySettings.sessionTimeout}
                  onChange={handleSecuritySettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  min="1"
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-autowise-blue text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Sauvegarder les paramètres de sécurité
                </button>
              </div>
            </form>
          </div>
          
          {/* Gestion des administrateurs */}
          <div id="admins" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4 pb-2 border-b">Gestion des administrateurs</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Liste des administrateurs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {adminAccounts.map((admin) => (
                      <tr key={admin.id}>
                        <td className="px-4 py-3 whitespace-nowrap">{admin.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{admin.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            admin.role === 'super-admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {admin.role === 'super-admin' ? 'Super Admin' : 'Gestionnaire'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            admin.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {admin.active ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => toggleAdminStatus(admin.id)}
                              className={`px-2 py-1 text-xs rounded ${
                                admin.active 
                                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                            >
                              {admin.active ? 'Désactiver' : 'Activer'}
                            </button>
                            <button
                              onClick={() => deleteAdmin(admin.id)}
                              className="px-2 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200"
                            >
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Ajouter un administrateur</h3>
              <form onSubmit={addNewAdmin} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newAdminData.name}
                      onChange={handleNewAdminChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={newAdminData.email}
                      onChange={handleNewAdminChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={newAdminData.password}
                      onChange={handleNewAdminChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      Rôle
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={newAdminData.role}
                      onChange={handleNewAdminChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="manager">Gestionnaire</option>
                      <option value="super-admin">Super Admin</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Ajouter l'administrateur
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Changement de mot de passe */}
          <div id="password" className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium mb-4 pb-2 border-b flex items-center">
              <Lock className="mr-2 h-5 w-5 text-autowise-blue" />
              Changer votre mot de passe
            </h2>
            
            <form onSubmit={changePassword} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-autowise-blue text-white rounded-md hover:bg-blue-700"
                >
                  Changer le mot de passe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
