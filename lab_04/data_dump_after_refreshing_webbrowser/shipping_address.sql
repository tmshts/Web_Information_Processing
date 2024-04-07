-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 02, 2024 at 10:20 AM
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
-- Table structure for table `shipping_address`
--

CREATE TABLE `shipping_address` (
  `shipping_id` int(10) UNSIGNED NOT NULL,
  `shipping_address_line_1` varchar(70) NOT NULL,
  `shipping_address_line_2` varchar(70) DEFAULT NULL,
  `shipping_town` varchar(50) NOT NULL,
  `shipping_city` varchar(50) NOT NULL,
  `shipping_eircode` varchar(50) DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shipping_address`
--

INSERT INTO `shipping_address` (`shipping_id`, `shipping_address_line_1`, `shipping_address_line_2`, `shipping_town`, `shipping_city`, `shipping_eircode`, `user_id`) VALUES
(1, 'ship 1 up', 'ship 2 up', 'ship town up', 'ship city up', 'ship eir up', 1),
(2, 'Castle Dawson 33', 'No name', 'Maynooth', 'Kildare', 'WE3YZE', 2),
(3, 'Castle Dawson 89', 'No name', 'Maynooth', 'Kildare', NULL, 3),
(5, 'F ship 1 up', 'F ship 2 up', 'F ship town', 'F ship city', 'F ship eir up', 5),
(7, 'F ship 1 C', 'F ship 2 C', 'F ship town C', 'F ship city C', 'F ship eir C', 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `shipping_address`
--
ALTER TABLE `shipping_address`
  ADD PRIMARY KEY (`shipping_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `shipping_address`
--
ALTER TABLE `shipping_address`
  MODIFY `shipping_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `shipping_address`
--
ALTER TABLE `shipping_address`
  ADD CONSTRAINT `shipping_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
