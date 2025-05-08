
# Instructions pour remplir Supabase avec des données réalistes

Ces instructions vous guideront étape par étape pour ajouter des données réalistes dans votre base Supabase pour l'application AutoWise.

## 1. Ajout de voitures

### Via l'interface Supabase

1. Connectez-vous au tableau de bord Supabase et accédez à votre projet
2. Allez dans **Table Editor** puis sélectionnez la table **cars**
3. Cliquez sur **Insert Row** et remplissez les champs suivants pour chaque voiture :
   - **brand**: Marque de la voiture (ex: "Toyota", "BMW", "Peugeot")
   - **model**: Modèle de la voiture (ex: "Corolla", "Série 3", "3008")
   - **year**: Année de fabrication (ex: 2022)
   - **price**: Prix par jour en TND (sans le symbole)
   - **description**: Description détaillée de la voiture
   - **features**: JSON des caractéristiques (ex: `{"airbags": true, "gps": true, "bluetooth": true}`)
   - **is_available**: `true` pour disponible
   - **category**: Catégorie (ex: "SUV", "Berline", "Compacte", "Premium")
   - **fuel_type**: Type de carburant (ex: "Essence", "Diesel", "Hybride", "Électrique")
   - **transmission**: Type de transmission (ex: "Automatique", "Manuelle")
   - **seats**: Nombre de sièges (ex: 5)

4. Pour ajouter des images, allez ensuite dans la table **car_images** :
   - **car_id**: ID de la voiture à laquelle associer l'image
   - **url**: URL de l'image (si vous avez des images dans le bucket storage)
   - **is_primary**: `true` pour l'image principale, `false` sinon

### Via l'application admin

Alternativement, vous pouvez utiliser l'interface d'administration d'AutoWise :
1. Connectez-vous avec un compte administrateur
2. Accédez à la section "Voitures" dans le menu admin
3. Cliquez sur "Ajouter une voiture" et remplissez le formulaire

## 2. Création d'utilisateurs

### Création d'utilisateurs clients

1. Via l'application :
   - Allez sur la page d'inscription
   - Remplissez le formulaire avec des informations fictives
   - Confirmez l'inscription

2. Via Supabase directement :
   - Allez dans **Authentication** > **Users**
   - Cliquez sur **Add User**
   - Remplissez les champs email et mot de passe
   - La table **profiles** sera automatiquement mise à jour grâce au trigger

### Création d'un utilisateur administrateur

1. Créez d'abord un utilisateur normal (via l'interface ou Supabase)
2. Dans Supabase, allez dans **Table Editor** > **user_roles**
3. Ajoutez une nouvelle ligne :
   - **user_id**: ID de l'utilisateur à promouvoir
   - **role**: Sélectionnez "admin" dans le menu déroulant

## 3. Ajout de réservations

### Via l'application client

1. Connectez-vous avec un compte client
2. Parcourez les voitures et sélectionnez-en une
3. Cliquez sur "Réserver"
4. Remplissez le formulaire de réservation
5. Confirmez la réservation

### Via Supabase directement

1. Allez dans **Table Editor** > **reservations**
2. Cliquez sur **Insert Row**
3. Remplissez les champs suivants :
   - **user_id**: ID de l'utilisateur qui réserve
   - **car_id**: ID de la voiture réservée
   - **start_date**: Date de début au format YYYY-MM-DD
   - **end_date**: Date de fin au format YYYY-MM-DD
   - **pickup_location**: Lieu de prise en charge
   - **return_location**: Lieu de retour
   - **total_price**: Prix total en TND
   - **status**: État de la réservation ("pending", "confirmed", "completed" ou "cancelled")
   - **with_driver**: `true` si avec chauffeur, `false` sinon

## 4. Vérification des données

### Vérification côté admin

1. Connectez-vous en tant qu'administrateur
2. Parcourez les sections Voitures, Réservations et Utilisateurs
3. Vérifiez que toutes les données sont correctement affichées

### Vérification côté client

1. Connectez-vous en tant que client
2. Accédez à "Mes réservations" dans votre profil
3. Vérifiez que vos réservations sont correctement affichées
4. Essayez de faire une nouvelle réservation et vérifiez qu'elle apparaît bien

## 5. Test des fonctionnalités administrateur

1. Connexion en tant qu'administrateur :
   - Allez sur `/admin/login`
   - Entrez les identifiants de votre compte administrateur

2. Gestion des voitures :
   - Ajoutez, modifiez ou supprimez des voitures
   - Vérifiez que les modifications sont visibles côté client

3. Gestion des réservations :
   - Confirmez ou annulez des réservations en attente
   - Vérifiez que le statut est mis à jour côté client

4. Gestion des utilisateurs :
   - Consultez la liste des utilisateurs
   - Modifiez leur statut si nécessaire

## Conseils de dépannage

Si vous rencontrez des problèmes :

1. Vérifiez les logs dans la console du navigateur
2. Assurez-vous que les Row Level Security (RLS) sont correctement configurées dans Supabase
3. Vérifiez que l'authentification fonctionne correctement 
4. Assurez-vous que les références entre tables (clés étrangères) sont correctes
