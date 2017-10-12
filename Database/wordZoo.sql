-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 12, 2017 at 08:04 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wordZoo`
--

-- --------------------------------------------------------

--
-- Table structure for table `connection`
--

CREATE TABLE `connection` (
  `word_A` char(12) NOT NULL,
  `word_b` char(12) NOT NULL,
  `weight` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `game_id` int(11) NOT NULL,
  `type` varchar(12) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `teacher_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `salt` varchar(50) NOT NULL,
  `hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `school_id` int(11) NOT NULL,
  `school_name` varchar(50) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `postcode` varchar(8) DEFAULT NULL,
  `phone_number` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `session_elephant`
--

CREATE TABLE `session_elephant` (
  `student_id` int(11) NOT NULL,
  `session_history_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `incorrect` char(50) NOT NULL,
  `timedate` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `session_giraffe`
--

CREATE TABLE `session_giraffe` (
  `student_id` int(11) NOT NULL,
  `session_history_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `incorrect` char(50) NOT NULL,
  `timedate` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `session_history`
--

CREATE TABLE `session_history` (
  `session_history_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `timedate` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `session_lion`
--

CREATE TABLE `session_lion` (
  `student_id` int(11) NOT NULL,
  `session_history_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `incorrect` char(50) NOT NULL,
  `timedate` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `session_octopus`
--

CREATE TABLE `session_octopus` (
  `student_id` int(11) NOT NULL,
  `session_history_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `incorrect` char(50) NOT NULL,
  `timedate` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `session_owl`
--

CREATE TABLE `session_owl` (
  `student_id` int(11) NOT NULL,
  `session_history_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `incorrect` char(50) NOT NULL,
  `timedate` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `session_panda`
--

CREATE TABLE `session_panda` (
  `student_id` int(11) NOT NULL,
  `session_history_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `incorrect` char(50) NOT NULL,
  `timedate` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `session_shark`
--

CREATE TABLE `session_shark` (
  `student_id` int(11) NOT NULL,
  `session_history_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `incorrect` char(50) NOT NULL,
  `timedate` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `session_sheep`
--

CREATE TABLE `session_sheep` (
  `student_id` int(11) NOT NULL,
  `session_history_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `incorrect` char(50) NOT NULL,
  `timedate` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `session_zebra`
--

CREATE TABLE `session_zebra` (
  `student_id` int(11) NOT NULL,
  `session_history_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `incorrect` char(50) NOT NULL,
  `timedate` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `teacher_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `word`
--

CREATE TABLE `word` (
  `word` char(12) NOT NULL,
  `length` int(11) NOT NULL,
  `num_vowels` int(11) NOT NULL,
  `num_syllables` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `frequency` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `connection`
--
ALTER TABLE `connection`
  ADD KEY `word_A` (`word_A`),
  ADD KEY `word_b` (`word_b`);

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`game_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `salt` (`salt`),
  ADD UNIQUE KEY `hash` (`hash`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `school`
--
ALTER TABLE `school`
  ADD PRIMARY KEY (`school_id`),
  ADD UNIQUE KEY `school_name` (`school_name`),
  ADD UNIQUE KEY `phone_number` (`phone_number`);

--
-- Indexes for table `session_elephant`
--
ALTER TABLE `session_elephant`
  ADD KEY `student_id` (`student_id`),
  ADD KEY `session_history_id` (`session_history_id`);

--
-- Indexes for table `session_giraffe`
--
ALTER TABLE `session_giraffe`
  ADD KEY `student_id` (`student_id`),
  ADD KEY `session_history_id` (`session_history_id`);

--
-- Indexes for table `session_history`
--
ALTER TABLE `session_history`
  ADD PRIMARY KEY (`session_history_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `session_lion`
--
ALTER TABLE `session_lion`
  ADD KEY `student_id` (`student_id`),
  ADD KEY `session_history_id` (`session_history_id`);

--
-- Indexes for table `session_octopus`
--
ALTER TABLE `session_octopus`
  ADD KEY `student_id` (`student_id`),
  ADD KEY `session_history_id` (`session_history_id`);

--
-- Indexes for table `session_owl`
--
ALTER TABLE `session_owl`
  ADD KEY `student_id` (`student_id`),
  ADD KEY `session_history_id` (`session_history_id`);

--
-- Indexes for table `session_panda`
--
ALTER TABLE `session_panda`
  ADD KEY `student_id` (`student_id`),
  ADD KEY `session_history_id` (`session_history_id`);

--
-- Indexes for table `session_shark`
--
ALTER TABLE `session_shark`
  ADD KEY `student_id` (`student_id`),
  ADD KEY `session_history_id` (`session_history_id`);

--
-- Indexes for table `session_sheep`
--
ALTER TABLE `session_sheep`
  ADD KEY `student_id` (`student_id`),
  ADD KEY `session_history_id` (`session_history_id`);

--
-- Indexes for table `session_zebra`
--
ALTER TABLE `session_zebra`
  ADD KEY `student_id` (`student_id`),
  ADD KEY `session_history_id` (`session_history_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`teacher_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `word`
--
ALTER TABLE `word`
  ADD PRIMARY KEY (`word`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `game_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `school`
--
ALTER TABLE `school`
  MODIFY `school_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `session_history`
--
ALTER TABLE `session_history`
  MODIFY `session_history_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `connection`
--
ALTER TABLE `connection`
  ADD CONSTRAINT `connection_ibfk_1` FOREIGN KEY (`word_A`) REFERENCES `word` (`word`),
  ADD CONSTRAINT `connection_ibfk_2` FOREIGN KEY (`word_b`) REFERENCES `word` (`word`);

--
-- Constraints for table `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`);

--
-- Constraints for table `session_elephant`
--
ALTER TABLE `session_elephant`
  ADD CONSTRAINT `session_elephant_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `session_elephant_ibfk_2` FOREIGN KEY (`session_history_id`) REFERENCES `session_history` (`session_history_id`);

--
-- Constraints for table `session_giraffe`
--
ALTER TABLE `session_giraffe`
  ADD CONSTRAINT `session_giraffe_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `session_giraffe_ibfk_2` FOREIGN KEY (`session_history_id`) REFERENCES `session_history` (`session_history_id`);

--
-- Constraints for table `session_history`
--
ALTER TABLE `session_history`
  ADD CONSTRAINT `session_history_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`);

--
-- Constraints for table `session_lion`
--
ALTER TABLE `session_lion`
  ADD CONSTRAINT `session_lion_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `session_lion_ibfk_2` FOREIGN KEY (`session_history_id`) REFERENCES `session_history` (`session_history_id`);

--
-- Constraints for table `session_octopus`
--
ALTER TABLE `session_octopus`
  ADD CONSTRAINT `session_octopus_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `session_octopus_ibfk_2` FOREIGN KEY (`session_history_id`) REFERENCES `session_history` (`session_history_id`);

--
-- Constraints for table `session_owl`
--
ALTER TABLE `session_owl`
  ADD CONSTRAINT `session_owl_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `session_owl_ibfk_2` FOREIGN KEY (`session_history_id`) REFERENCES `session_history` (`session_history_id`);

--
-- Constraints for table `session_panda`
--
ALTER TABLE `session_panda`
  ADD CONSTRAINT `session_panda_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `session_panda_ibfk_2` FOREIGN KEY (`session_history_id`) REFERENCES `session_history` (`session_history_id`);

--
-- Constraints for table `session_shark`
--
ALTER TABLE `session_shark`
  ADD CONSTRAINT `session_shark_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `session_shark_ibfk_2` FOREIGN KEY (`session_history_id`) REFERENCES `session_history` (`session_history_id`);

--
-- Constraints for table `session_sheep`
--
ALTER TABLE `session_sheep`
  ADD CONSTRAINT `session_sheep_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `session_sheep_ibfk_2` FOREIGN KEY (`session_history_id`) REFERENCES `session_history` (`session_history_id`);

--
-- Constraints for table `session_zebra`
--
ALTER TABLE `session_zebra`
  ADD CONSTRAINT `session_zebra_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `session_zebra_ibfk_2` FOREIGN KEY (`session_history_id`) REFERENCES `session_history` (`session_history_id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`);

--
-- Constraints for table `teacher`
--
ALTER TABLE `teacher`
  ADD CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `school` (`school_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
