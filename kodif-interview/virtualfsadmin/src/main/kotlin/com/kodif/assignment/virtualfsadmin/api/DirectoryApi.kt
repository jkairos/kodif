package com.kodif.assignment.virtualfsadmin.api

import com.kodif.assignment.virtualfsadmin.model.CommandRequest
import com.kodif.assignment.virtualfsadmin.model.DirectoryResponse
import com.kodif.assignment.virtualfsadmin.model.LsResponse
import com.kodif.assignment.virtualfsadmin.model.PwdResponse
import org.springframework.web.bind.annotation.*

interface DirectoryApi {
    @PostMapping("/api/cd")
    fun changeDirectory(@RequestBody commandRequest: CommandRequest): DirectoryResponse

    @PostMapping("/api/mkdir")
    fun makeDirectory(@RequestBody commandRequest: CommandRequest): DirectoryResponse

    @PostMapping("/api/ls")
    fun listDirectories(@RequestBody commandRequest: CommandRequest): Any

    @GetMapping("/api/pwd")
    fun printWorkingDirectory(): PwdResponse
}
