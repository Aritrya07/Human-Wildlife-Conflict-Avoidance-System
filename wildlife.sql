-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2024 at 04:39 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wildlife`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `role`) VALUES
(1, 'aritryasenapati.0807@gmail.com', 'aritrya@0807', 'super'),
(2, 'aritrya.7.senapati@gmail.com', 'aritrya@1234', 'moderator'),
(5, 'admin1@gmail.com', 'admin1@1234', 'super'),
(8, 'admin2@gmail.com', 'admin2@1234', 'moderator');

-- --------------------------------------------------------

--
-- Table structure for table `alerts`
--

CREATE TABLE `alerts` (
  `id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `alert_type` varchar(255) NOT NULL,
  `security_guard_id` int(10) NOT NULL,
  `flat_owner_id` int(10) NOT NULL,
  `incident_id` int(10) NOT NULL,
  `alert_date` text NOT NULL,
  `alert_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alerts`
--

INSERT INTO `alerts` (`id`, `title`, `description`, `alert_type`, `security_guard_id`, `flat_owner_id`, `incident_id`, `alert_date`, `alert_time`) VALUES
(9, 'Alert3', 'Alert3 Description', 'Type3', 103, 203, 303, '2023-03-03', '13:34:21'),
(14, 'Alert6', 'Alert6 Description', 'Type6', 106, 206, 306, '2000-07-08', '06:29:00'),
(15, 'Alert7', 'Alert7 Description', 'Type7', 107, 207, 307, '2023-05-01', '23:36:00'),
(21, 'Alert8', 'Alert8 Description', 'Type8', 19, 26, 28, '2008-08-08', '08:08:00');

-- --------------------------------------------------------

--
-- Table structure for table `flat_owner`
--

CREATE TABLE `flat_owner` (
  `id` int(10) NOT NULL,
  `flat_no` varchar(255) NOT NULL,
  `owner_name` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `no_of_members` int(10) NOT NULL,
  `tower_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flat_owner`
--

INSERT INTO `flat_owner` (`id`, `flat_no`, `owner_name`, `phone`, `email`, `no_of_members`, `tower_id`) VALUES
(26, '144', 'Aritrya Senapati', '8617282014', 'aritryasenapati.0807@gmail.com', 5, 7),
(27, '145', 'Vishal Kumar Sinha', '9876543217', 'vk@gmail.com', 4, 9),
(28, '146', 'Anirban Ghosh', '9876543212', 'anirbanghosh@gmail.com', 3, 2),
(30, '147', 'Owner1', '8617282014', 'owner1@gmail.com', 4, 7),
(31, '148', 'Owner2', '8617282014', 'owner2@gmail.com', 3, 7);

-- --------------------------------------------------------

--
-- Table structure for table `incidents`
--

CREATE TABLE `incidents` (
  `id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date` text NOT NULL,
  `time` time NOT NULL,
  `sevierity_level` int(10) NOT NULL,
  `source_of_info` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incidents`
--

INSERT INTO `incidents` (`id`, `title`, `description`, `date`, `time`, `sevierity_level`, `source_of_info`, `type`) VALUES
(28, 'title107', 'description107', '2007-07-07', '07:07:00', 107, '19', 'type107'),
(31, 'title 108', 'description 108', '2007-07-08', '08:08:00', 8, '19', 'type 8');

-- --------------------------------------------------------

--
-- Table structure for table `security_guard`
--

CREATE TABLE `security_guard` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `town` varchar(255) NOT NULL,
  `PO` varchar(255) NOT NULL,
  `Dist` varchar(255) NOT NULL,
  `State` varchar(255) NOT NULL,
  `PIN` int(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `aadhar_no` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `security_guard`
--

INSERT INTO `security_guard` (`id`, `name`, `town`, `PO`, `Dist`, `State`, `PIN`, `email`, `password`, `phone`, `aadhar_no`, `picture`) VALUES
(19, 'Security2', 'town2', 'po2', 'dist2', 'state2', 2, 'security2@gmail.com', 'security2@1234', '9876543210', '000000000002', '1694358625501.jpg'),
(20, 'Security1', 'town1', 'po1', 'dist1', 'state1', 0, 'security1@gmail.com', 'security1@1234', '0000000001', '000000000001', '1694359983259.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tower`
--

CREATE TABLE `tower` (
  `id` int(10) NOT NULL,
  `tower_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `no_of_flats` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tower`
--

INSERT INTO `tower` (`id`, `tower_name`, `description`, `no_of_flats`) VALUES
(2, 'Tower A', 'Description for Tower A', 65),
(7, 'Tower B', 'Description for Tower B', 66),
(8, 'Tower C', 'Description for Tower C', 67),
(9, 'Tower D', 'Description for Tower D', 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `alerts`
--
ALTER TABLE `alerts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `flat_owner`
--
ALTER TABLE `flat_owner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `incidents`
--
ALTER TABLE `incidents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `security_guard`
--
ALTER TABLE `security_guard`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `aadhar_no` (`aadhar_no`);

--
-- Indexes for table `tower`
--
ALTER TABLE `tower`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `alerts`
--
ALTER TABLE `alerts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `flat_owner`
--
ALTER TABLE `flat_owner`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `incidents`
--
ALTER TABLE `incidents`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `security_guard`
--
ALTER TABLE `security_guard`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tower`
--
ALTER TABLE `tower`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
