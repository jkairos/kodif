package com.kodif.assignment.virtualfsadmin.controller

import com.kodif.assignment.virtualfsadmin.model.CommandRequest
import com.kodif.assignment.virtualfsadmin.model.DirectoryResponse
import com.kodif.assignment.virtualfsadmin.model.LsResponse
import com.kodif.assignment.virtualfsadmin.service.DirectoryService
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test

class DirectoryControllerTest {

    private val directoryService = mockk<DirectoryService>()
    private val directoryController = DirectoryController(directoryService)

    @Test
    fun `test changeDirectory`() {
        val commandRequest = mockk<CommandRequest>()
        every { commandRequest.command } returns "cd /newdir"
        every { directoryService.changeDirectory(any()) } returns "/newdir"

        val response = directoryController.changeDirectory(commandRequest)

        assertEquals("/newdir", response.message)
        verify { directoryService.changeDirectory("cd /newdir") }
    }

    @Test
    fun `test makeDirectory`() {
        val commandRequest = mockk<CommandRequest>()
        every { commandRequest.command } returns "mkdir newdir"
        every { directoryService.makeDirectory(any()) } returns "Directory created"

        val response = directoryController.makeDirectory(commandRequest)

        assertEquals("Directory created", response.message)
        verify { directoryService.makeDirectory("mkdir newdir") }
    }

    @Test
    fun `test listDirectories with directories`() {
        val commandRequest = mockk<CommandRequest>()
        every { commandRequest.command } returns "ls"
        every { directoryService.listDirectories(any()) } returns listOf("dir1", "dir2")

        val response = directoryController.listDirectories(commandRequest) as LsResponse

        assertEquals(listOf("dir1", "dir2"), response.directories)
        verify { directoryService.listDirectories("ls") }
    }

    @Test
    fun `test listDirectories with error`() {
        val commandRequest = mockk<CommandRequest>()
        every { commandRequest.command } returns "ls /nonexistent"
        every { directoryService.listDirectories(any()) } returns "ls: cannot access '/nonexistent': No such file or directory"

        val response = directoryController.listDirectories(commandRequest) as DirectoryResponse

        assertEquals("ls: cannot access '/nonexistent': No such file or directory", response.message)
        verify { directoryService.listDirectories("ls /nonexistent") }
    }

    @Test
    fun `test printWorkingDirectory`() {
        every { directoryService.printWorkingDirectory() } returns "/currentdir"

        val response = directoryController.printWorkingDirectory()

        assertEquals("/currentdir", response.cwd)
        verify { directoryService.printWorkingDirectory() }
    }
}
