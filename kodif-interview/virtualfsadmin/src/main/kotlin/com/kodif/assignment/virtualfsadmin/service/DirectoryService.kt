package com.kodif.assignment.virtualfsadmin.service

import org.springframework.stereotype.Service
import java.nio.file.Paths

@Service
class DirectoryService {

    private var currentWorkingDirectory = "/"
    private val fileSystem = mutableMapOf<String, MutableList<String>>()

    init {
        fileSystem[currentWorkingDirectory] = mutableListOf()
    }

    fun changeDirectory(command: String): String {
        val trimmedCommand = command.trim()
        val path = if (trimmedCommand == "cd" || trimmedCommand == "cd .") "." else trimmedCommand.removePrefix("cd ").trim()
        if (!trimmedCommand.startsWith("cd")) return "$command: command not found"
        currentWorkingDirectory = executeCdCommand(path)
        return currentWorkingDirectory
    }

    fun makeDirectory(command: String): String {
        if (!command.startsWith("mkdir ")) return "$command: command not found"
        val dirName = command.removePrefix("mkdir ").trim()
        val fullPath = Paths.get(currentWorkingDirectory, dirName).normalize().toString()
        fileSystem.putIfAbsent(fullPath, mutableListOf())
        fileSystem[currentWorkingDirectory]?.add(dirName)
        return "Directory created"
    }

    fun listDirectories(command: String): Any {
        val trimmedCommand = command.trim()
        val path = if (trimmedCommand == "ls" || trimmedCommand == "ls .") "." else trimmedCommand.removePrefix("ls ").trim()
        if (!trimmedCommand.startsWith("ls")) return "$command: command not found"
        val targetDirectory = if (path.startsWith("/")) path else Paths.get(currentWorkingDirectory, path).normalize().toString()
        return if (fileSystem.containsKey(targetDirectory)) {
            fileSystem[targetDirectory]?.toList() ?: emptyList<String>()
        } else {
            "ls: cannot access '$path': No such file or directory"
        }
    }

    fun printWorkingDirectory(): String {
        return currentWorkingDirectory
    }

    private fun executeCdCommand(path: String): String {
        val newPath = if (path == ".") currentWorkingDirectory else if (path.startsWith("/")) path else "$currentWorkingDirectory/$path"
        val parts = Paths.get(newPath).normalize().toString().split("/")
        val resolvedParts = mutableListOf<String>()
        for (part in parts) {
            when (part) {
                ".", "" -> {}
                ".." -> if (resolvedParts.isNotEmpty()) resolvedParts.removeAt(resolvedParts.size - 1)
                else -> resolvedParts.add(part)
            }
        }
        return "/" + resolvedParts.joinToString("/")
    }
}
