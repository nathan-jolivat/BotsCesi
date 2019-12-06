-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le :  ven. 06 déc. 2019 à 13:27
-- Version du serveur :  5.7.25
-- Version de PHP :  7.2.14

SET time_zone = "+00:00";

--
-- Base de données :  `bot`
--

-- --------------------------------------------------------

--
-- Structure de la table `campus`
--

CREATE TABLE `campus` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `address` varchar(50) NOT NULL DEFAULT '',
  `zip_code` int(6) NOT NULL,
  `city` varchar(30) NOT NULL DEFAULT '',
  `total_students` int(5) DEFAULT '0'
) ;

--
-- Déchargement des données de la table `campus`
--

INSERT INTO `campus` (`id`, `name`, `address`, `zip_code`, `city`, `total_students`) VALUES
(1, 'Campus CESI Nantes', '1 Avenue Augustin-Louis Cauchy', 44307, 'Nantes', 0),
(2, 'Campus CESI Bordeaux', '264 Boulevard Godard', 33300, 'Bordeaux', 0),
(3, 'Campus CESI Le Mans', '44 Avenue Frédéric Auguste Bartholdi', 72000, 'Le Mans', 0);

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

CREATE TABLE `cours` (
  `id` int(11) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL DEFAULT '',
  `start_at` datetime NOT NULL,
  `end_at` datetime NOT NULL,
  `user_id` int(5) DEFAULT NULL,
  `teacher` varchar(50) NOT NULL DEFAULT ''
) ;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`id`, `title`, `start_at`, `end_at`, `user_id`, `teacher`) VALUES
(1, 'ASO', '2019-12-06 08:30:00', '2019-12-06 16:30:00', 3, 'Eric ROUSSEL'),
(2, 'Algorithmique', '2019-12-03 08:30:00', '2019-12-04 16:30:00', 2, 'Florian PICHON'),
(3, 'Gestion de projet', '2019-12-05 08:30:00', '2019-12-05 16:30:00', 4, 'Catherine GUERON'),
(4, 'Javascript', '2019-12-09 08:30:00', '2019-12-10 16:30:00', 1, 'Alain CARRIOU');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `age` int(11) NOT NULL,
  `campus_id` int(11) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(30) NOT NULL DEFAULT ''
) ;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `age`, `campus_id`, `is_admin`, `password`) VALUES
(1, 'Nathan', 'JOLIVAT', 'nathan.jolivat@viacesi.fr', 20, 1, 1, 'test'),
(2, 'Yannick', 'MOREAU', 'yannick.moreau1@viacesi.fr', 29, 1, 1, ''),
(3, 'Corentin', 'GOMEZ', 'corentin.gomez@viacesi.fr', 34, NULL, 0, ''),
(4, 'Maxime', 'Guillou', 'maxime.guillou@viacesi.fr', 20, NULL, 0, ''),
(5, 'Antonin', 'Richard', 'antonin.richard@viacesi.fr', 22, NULL, 0, ''),
(6, 'Steve', 'Mandela', 'steve.mandela@viacesi.fr', 25, NULL, 0, ''),
(7, 'Louis', 'Dussoulier', 'louis.dussoulier@viacesi.fr', 20, NULL, 0, ''),
(8, 'Corentin', 'Vinet', 'corentin.vinet@viacesi.fr', 20, NULL, 0, '');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `campus`
--
ALTER TABLE `campus`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `cours`
--
ALTER TABLE `cours`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `campus`
--
ALTER TABLE `campus`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `cours`
--
ALTER TABLE `cours`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
