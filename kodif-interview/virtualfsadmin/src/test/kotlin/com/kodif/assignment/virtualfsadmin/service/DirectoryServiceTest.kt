package com.kodif.assignment.virtualfsadmin.service

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class DirectoryServiceTest {

    private lateinit var directoryService: DirectoryService

    @BeforeEach
    fun setUp() {
        directoryService = DirectoryService()
    }

    @Test
    fun `test changeDirectory with valid path`() {
        val result = directoryService.changeDirectory("cd /newdir")
        assertEquals("/newdir", result)
    }

    @Test
    fun `test changeDirectory with root path`() {
        val result = directoryService.changeDirectory("cd /")
        assertEquals("/", result)
    }

    @Test
    fun `test changeDirectory with relative path`() {
        directoryService.changeDirectory("cd /newdir")
        val result = directoryService.changeDirectory("cd subdir")
        assertEquals("/newdir/subdir", result)
    }

    @Test
    fun `test changeDirectory with invalid command`() {
        val result = directoryService.changeDirectory("invalid")
        assertEquals("invalid: command not found", result)
    }

    @Test
    fun `test makeDirectory with valid path`() {
        val result = directoryService.makeDirectory("mkdir newdir")
        assertEquals("Directory created", result)
    }

    @Test
    fun `test makeDirectory with invalid command`() {
        val result = directoryService.makeDirectory("invalid")
        assertEquals("invalid: command not found", result)
    }

    @Test
    fun `test listDirectories in existing directory`() {
        directoryService.makeDirectory("mkdir newdir")
        val result = directoryService.listDirectories("ls /")
        assertTrue(result is List<*>)
        assertEquals(listOf("newdir"), result)
    }

    @Test
    fun `test listDirectories in non-existing directory`() {
        val result = directoryService.listDirectories("ls /nonexistent")
        assertEquals("ls: cannot access '/nonexistent': No such file or directory", result)
    }

    @Test
    fun `test listDirectories with invalid command`() {
        val result = directoryService.listDirectories("invalid")
        assertEquals("invalid: command not found", result)
    }

    @Test
    fun `test printWorkingDirectory`() {
        val result = directoryService.printWorkingDirectory()
        assertEquals("/", result)
    }

    @Test
    fun `test executeCdCommand with relative path`() {
        val result = directoryService.changeDirectory("cd /newdir")
        assertEquals("/newdir", result)
    }

    @Test
    fun `test executeCdCommand with parent directory`() {
        directoryService.changeDirectory("cd /newdir")
        val result = directoryService.changeDirectory("cd ..")
        assertEquals("/", result)
    }

    @Test
    fun `test executeCdCommand with root directory`() {
        val result = directoryService.changeDirectory("cd /")
        assertEquals("/", result)
    }

    @Test
    fun `test executeCdCommand with same directory`() {
        val result = directoryService.changeDirectory("cd .")
        assertEquals("/", result)
    }
}
