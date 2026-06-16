# 📦 Stock Manager

Application de gestion de stock développée avec Laravel, Inertia.js et React.

---

## 🚀 Fonctionnalités

### 📊 Dashboard
- Statistiques (produits, clients, catégories)
- Produits en faible stock
- Produits en rupture de stock
- Derniers produits ajoutés
- Recherche et filtres

### 📦 Produits
- CRUD complet
- Gestion du stock
- Association avec catégories

### 📁 Catégories
- CRUD simple

### 👥 Clients
- CRUD clients

### 📊 Stock
- Entrée de stock
- Sortie de stock
- Ajustement de stock
- Historique des mouvements

---

## 🔍 Recherche & filtres

- Recherche produits (nom / SKU)
- Filtre par catégorie
- Filtre par stock (low / out)

---

## 🧱 Technologies

- Laravel
- Inertia.js
- React.js
- Tailwind CSS
- MySQL

---

## ⚙️ Installation

```bash
git clone https://github.com/FenosoaR/stock-manager.git
cd stock-manager

composer install
npm install

cp .env.example .env
php artisan key:generate

php artisan migrate --seed

php artisan serve
npm run dev