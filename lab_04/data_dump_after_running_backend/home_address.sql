-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 02, 2024 at 10:19 AM
-- Server version: 10.3.31-MariaDB-0+deb10u1
-- PHP Version: 7.3.31-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs230_u240829`
--

-- --------------------------------------------------------

--
-- Table structure for table `home_address`
--

CREATE TABLE `home_address` (
  `home_id` int(10) UNSIGNED NOT NULL,
  `home_address_line_1` varchar(70) NOT NULL,
  `home_address_line_2` varchar(70) DEFAULT NULL,
  `home_town` varchar(50) NOT NULL,
  `home_city` varchar(50) NOT NULL,
  `home_eircode` varchar(50) DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `home_address`
--

INSERT INTO `home_address` (`home_id`, `home_address_line_1`, `home_address_line_2`, `home_town`, `home_city`, `home_eircode`, `user_id`) VALUES
(1, 'home 1 up', 'hope 2 up', 'home town up', 'home city up', 'home eir up', 1),
(2, 'Castle Dawson 33', 'No name', 'Maynooth', 'Kildare', 'WE3YZE', 2),
(3, 'Castle Dawson 89', 'No name', 'Maynooth', 'Kildare', NULL, 3),
(4, 'Springs Road 39', NULL, 'Dublin', 'Dublin', NULL, 4),
(5, 'Springs Road 12', NULL, 'Dublin', 'Dublin', NULL, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `home_address`
--
ALTER TABLE `home_address`
  ADD PRIMARY KEY (`home_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `home_address`
--
ALTER TABLE `home_address`
  MODIFY `home_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `home_address`
--
ALTER TABLE `home_address`
  ADD CONSTRAINT `home_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
