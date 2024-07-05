package com.kodif.assignment.virtualfsadmin.controller

import com.kodif.assignment.virtualfsadmin.api.DirectoryApi
import com.kodif.assignment.virtualfsadmin.model.CommandRequest
import com.kodif.assignment.virtualfsadmin.model.DirectoryResponse
import com.kodif.assignment.virtualfsadmin.model.LsResponse
import com.kodif.assignment.virtualfsadmin.model.PwdResponse
import com.kodif.assignment.virtualfsadmin.service.DirectoryService
import org.springframework.web.bind.annotation.RestController

@RestController
class DirectoryController(val directoryService: DirectoryService) : DirectoryApi {

    override fun changeDirectory(commandRequest: CommandRequest): DirectoryResponse {
        val result = directoryService.changeDirectory(commandRequest.command)
        return DirectoryResponse().apply { message = result }
    }

    override fun makeDirectory(commandRequest: CommandRequest): DirectoryResponse {
        val result = directoryService.makeDirectory(commandRequest.command)
        return DirectoryResponse().apply { message = result }
    }

    override fun listDirectories(commandRequest: CommandRequest): Any {
        val result = directoryService.listDirectories(commandRequest.command)
        return if (result is String) {
            DirectoryResponse().apply { message = result }
        } else {
            LsResponse().apply { directories = result as List<String> }
        }
    }

    override fun printWorkingDirectory(): PwdResponse {
        val cwd = directoryService.printWorkingDirectory()
        return PwdResponse().apply { this.cwd = cwd }
    }
}
